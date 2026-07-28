window.SQLMasteryValidator = (() => {
  const normalizeName = value => String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[`"'[\]]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const normalizeValue = value => {
    if (value === null || value === undefined) return null;
    if (typeof value === "number") return value;
    const text = String(value).trim();
    const numeric = Number(text);
    return text !== "" && Number.isFinite(numeric) ? numeric : text;
  };

  const approximatelyEqual = (left, right, tolerance) => {
    const a = normalizeValue(left);
    const b = normalizeValue(right);
    if (a === null || b === null) return a === b;
    if (typeof a === "number" && typeof b === "number") {
      return Math.abs(a - b) <= tolerance;
    }
    return String(a).trim() === String(b).trim();
  };

  const projectRows = (result, indexes) =>
    result.values.map(row => indexes.map(index => row[index]));

  // Add virtual YYYY-MM columns when a learner returns year and month
  // separately. This lets `YEAR(date), MONTH(date)` match a reference
  // result such as `strftime('%Y-%m', date)`.
  const expandDateColumns = result => {
    const columns = [...result.columns];
    const values = result.values.map(row => [...row]);

    for (let yearIndex = 0; yearIndex < result.columns.length; yearIndex++) {
      for (let monthIndex = 0; monthIndex < result.columns.length; monthIndex++) {
        if (yearIndex === monthIndex) continue;

        const pairs = result.values.map(row => {
          const year = Number(row[yearIndex]);
          const month = Number(row[monthIndex]);
          return { year, month };
        });

        const valid = pairs.length > 0 && pairs.every(({ year, month }) =>
          Number.isInteger(year) &&
          year >= 1900 &&
          year <= 2200 &&
          Number.isInteger(month) &&
          month >= 1 &&
          month <= 12
        );

        if (!valid) continue;

        columns.push(`virtual_year_month_${yearIndex}_${monthIndex}`);
        values.forEach((row, rowIndex) => {
          const { year, month } = pairs[rowIndex];
          row.push(`${year}-${String(month).padStart(2, "0")}`);
        });
      }
    }

    return { ...result, columns, values };
  };

  const rowEquals = (a, b, tolerance) =>
    a.length === b.length &&
    a.every((value, index) => approximatelyEqual(value, b[index], tolerance));

  const compareRows = (actualRows, expectedRows, ordered, tolerance) => {
    if (actualRows.length !== expectedRows.length) return false;

    if (ordered) {
      return actualRows.every((row, index) =>
        rowEquals(row, expectedRows[index], tolerance)
      );
    }

    const used = new Set();
    for (const actualRow of actualRows) {
      let matched = -1;
      for (let i = 0; i < expectedRows.length; i++) {
        if (!used.has(i) && rowEquals(actualRow, expectedRows[i], tolerance)) {
          matched = i;
          break;
        }
      }
      if (matched < 0) return false;
      used.add(matched);
    }
    return true;
  };

  const findExpectedIndexes = (expected, requiredColumns) => {
    const names = expected.columns.map(normalizeName);
    return requiredColumns.map(required => names.indexOf(normalizeName(required)));
  };

  const findProjection = (
    actual,
    expectedRows,
    requiredCount,
    ordered,
    tolerance
  ) => {
    const chosen = [];
    const used = new Set();

    function search(position) {
      if (position === requiredCount) {
        return compareRows(
          projectRows(actual, chosen),
          expectedRows,
          ordered,
          tolerance
        ) ? [...chosen] : null;
      }

      for (let index = 0; index < actual.columns.length; index++) {
        if (used.has(index)) continue;
        chosen.push(index);
        used.add(index);

        const expectedPrefix = expectedRows.map(row =>
          row.slice(0, chosen.length)
        );
        if (compareRows(
          projectRows(actual, chosen),
          expectedPrefix,
          ordered,
          tolerance
        )) {
          const found = search(position + 1);
          if (found) return found;
        }

        chosen.pop();
        used.delete(index);
      }
      return null;
    }

    return search(0);
  };

  const emptySqlLooksRelevant = (submittedSql, groups = []) => {
    if (!groups.length) return true;
    const sql = String(submittedSql || "");
    return groups.every(group =>
      group.some(pattern => new RegExp(pattern, "i").test(sql))
    );
  };

  function validate(actual, expected, rules = {}, submittedSql = "") {
    actual = expandDateColumns(actual);

    const requiredColumns = rules.requiredColumns?.length
      ? rules.requiredColumns.map(normalizeName)
      : expected.columns.map(normalizeName);

    const expectedIndexes = findExpectedIndexes(expected, requiredColumns);
    if (expectedIndexes.some(index => index < 0)) {
      return {
        correct: false,
        message: "This exercise has an invalid validation configuration. Please report the question number."
      };
    }

    if (actual.values.length !== expected.values.length) {
      return {
        correct: false,
        message: `Your query returned ${actual.values.length} row(s); the expected result has ${expected.values.length}.`
      };
    }

    if (actual.columns.length < requiredColumns.length) {
      return {
        correct: false,
        message: `Your query needs at least ${requiredColumns.length} essential result column(s), but it returned ${actual.columns.length}.`
      };
    }

    // Empty expected sets need a structural guard. Otherwise any unrelated
    // `WHERE 1=0` query would appear correct.
    if (expected.values.length === 0) {
      if (!emptySqlLooksRelevant(submittedSql, rules.emptyResultSqlGroups)) {
        return {
          correct: false,
          message: "Your query returned no rows, but it does not appear to apply the required tables and conditions for this question."
        };
      }
      return {
        correct: true,
        message: "Correct. No records satisfy the condition in this database, and your query applies the relevant logic."
      };
    }

    const tolerance = Number.isFinite(Number(rules.numericTolerance))
      ? Number(rules.numericTolerance)
      : 0.011;
    const ordered = Boolean(rules.orderSensitive);
    const expectedRows = projectRows(expected, expectedIndexes);

    // Prefer semantic alias matching when available.
    const actualNames = actual.columns.map(normalizeName);
    const namedIndexes = requiredColumns.map(required =>
      actualNames.indexOf(required)
    );

    if (
      namedIndexes.every(index => index >= 0) &&
      compareRows(
        projectRows(actual, namedIndexes),
        expectedRows,
        ordered,
        tolerance
      )
    ) {
      return {
        correct: true,
        message: "Correct result. Your SQL approach may differ from the reference solution."
      };
    }

    // Fall back to value-based projection so aliases, column order, and
    // optional descriptive columns may differ.
    const projection = findProjection(
      actual,
      expectedRows,
      requiredColumns.length,
      ordered,
      tolerance
    );

    if (projection) {
      const note = actual.columns.length > requiredColumns.length
        ? " Extra descriptive columns were allowed."
        : "";
      return {
        correct: true,
        message: `Correct result. The essential values match.${note}`
      };
    }

    return {
      correct: false,
      message: "Your query ran successfully, but the essential result values do not match the expected answer. Different SQL wording, aliases, spacing, indentation, column order, and optional descriptive columns are allowed."
    };
  }

  return { validate };
})();
