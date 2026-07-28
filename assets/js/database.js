window.SQLMasteryDatabase = (() => {
  let SQL, db, bytes;

  async function init(url) {
    SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    });
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not load database (${response.status}).`);
    bytes = new Uint8Array(await response.arrayBuffer());
    db = new SQL.Database(bytes);
  }

  function translateDialect(source) {
    let sql = String(source);
    const notes = [];

    sql = sql.replace(/\bYEAR\s*\(([^()]+)\)/gi, (_, expression) => {
      notes.push("YEAR(date) was translated to SQLite strftime().");
      return `CAST(strftime('%Y', ${expression}) AS INTEGER)`;
    });

    sql = sql.replace(/\bMONTH\s*\(([^()]+)\)/gi, (_, expression) => {
      notes.push("MONTH(date) was translated to SQLite strftime().");
      return `CAST(strftime('%m', ${expression}) AS INTEGER)`;
    });

    sql = sql.replace(/\bGETDATE\s*\(\s*\)/gi, () => {
      notes.push("GETDATE() was translated to SQLite datetime('now').");
      return "datetime('now')";
    });

    sql = sql.replace(/\bISNULL\s*\(/gi, () => {
      notes.push("ISNULL() was translated to SQLite IFNULL().");
      return "IFNULL(";
    });

    const topMatch = sql.match(/^\s*SELECT\s+(DISTINCT\s+)?TOP\s*\(?\s*(\d+)\s*\)?\s+/i);
    if (topMatch) {
      const distinct = topMatch[1] || "";
      const limit = topMatch[2];
      sql = sql.replace(
        /^\s*SELECT\s+(DISTINCT\s+)?TOP\s*\(?\s*\d+\s*\)?\s+/i,
        `SELECT ${distinct}`
      );
      sql = sql.trim().replace(/;+\s*$/, "");
      if (!/\bLIMIT\s+\d+\s*$/i.test(sql)) sql += ` LIMIT ${limit}`;
      sql += ";";
      notes.push(`TOP ${limit} was translated to SQLite LIMIT ${limit}.`);
    }

    return { sql, notes: [...new Set(notes)] };
  }

  function dialectError(error, originalSql) {
    const message = String(error?.message || error);
    const unsupported = [
      [/\bDATE_TRUNC\s*\(/i, "DATE_TRUNC() is not available in SQLite. Use strftime() or date(..., 'start of month')."],
      [/\bEXTRACT\s*\(/i, "EXTRACT() is not available in SQLite. Use strftime()."],
      [/\bINTERVAL\b/i, "SQLite uses date modifiers such as date(value, '+1 month') instead of INTERVAL."],
      [/\bDATEDIFF\s*\(/i, "DATEDIFF() is not available in SQLite. Use julianday(end_date) - julianday(start_date)."],
      [/\bPERCENTILE_CONT\s*\(/i, "PERCENTILE_CONT() is not available in this SQLite environment; use a window-based percentile pattern."],
      [/\bQUALIFY\b/i, "QUALIFY is not supported in SQLite. Put the window query in a CTE and filter it in an outer query."]
    ];
    const hint = unsupported.find(([pattern]) => pattern.test(originalSql));
    const enhanced = new Error(hint ? `${message}\n\nDialect guidance: ${hint[1]}` : message);
    enhanced.noPenalty = Boolean(hint);
    return enhanced;
  }

  function execute(sourceSql) {
    if (!db) throw new Error("Database is not ready.");
    const translated = translateDialect(sourceSql);
    const start = performance.now();

    try {
      const sets = db.exec(translated.sql);
      const elapsed = performance.now() - start;
      const first = sets[0] || { columns: [], values: [] };
      return {
        columns: first.columns || [],
        values: first.values || [],
        elapsed,
        dialectNotes: translated.notes
      };
    } catch (error) {
      throw dialectError(error, sourceSql);
    }
  }

  function reset() {
    if (db) db.close();
    db = new SQL.Database(bytes);
  }

  function schema() {
    return execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    ).values.map(([name]) => ({
      name,
      count: execute(`SELECT COUNT(*) FROM "${name}"`).values[0][0],
      columns: execute(`PRAGMA table_info("${name}")`).values.map(column => ({
        name: column[1],
        type: column[2],
        pk: Boolean(column[5])
      }))
    }));
  }

  return { init, execute, reset, schema, translateDialect };
})();
