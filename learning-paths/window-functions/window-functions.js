window.SQL_MASTERY_MODULE = {
  "id": "window-functions",
  "title": "window functions",
  "learningPath": 6,
  "questionCount": 35,
  "database": "../../databases/hr.sqlite",
  "storageKey": "sqlMasteryWindowFunctionsV2",
  "patternGoal": {
    "recognize": [
      "within each group",
      "rank",
      "previous",
      "next",
      "running total",
      "compare to department average",
      "keep all rows"
    ],
    "think": [
      "OVER()",
      "PARTITION BY",
      "ORDER BY inside OVER()",
      "LAG()",
      "LEAD()",
      "ROW_NUMBER()",
      "RANK()",
      "DENSE_RANK()"
    ]
  },
  "frameworkPrompts": [
    "What should one output row represent?",
    "Must all original rows remain visible?",
    "What defines the partition or group?",
    "What ordering is required inside OVER()?",
    "Which window function matches the task?",
    "Are ties important?",
    "Does the calculation need an explicit window frame?",
    "Must the window result be filtered in a CTE or subquery?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Display each employee with their latest salary and the average latest salary for their department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  ROUND(AVG(ls.salary) OVER (\n    PARTITION BY e.department_id\n  ), 2) AS department_average_salary\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "First isolate one latest salary row per employee.",
        "Use AVG() as a window function partitioned by department.",
        "A window aggregate keeps each employee row in the result."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "salary",
          "department_average_salary"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 2,
      "difficulty": "Beginner",
      "text": "Display each employee with their latest salary and the overall average latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  ls.salary,\n  ROUND(AVG(ls.salary) OVER (), 2) AS overall_average_salary\nFROM employees AS e\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use OVER() without PARTITION BY for an overall window.",
        "Make sure each employee contributes only their latest salary.",
        "The employee rows should remain visible."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "salary",
          "overall_average_salary"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 3,
      "difficulty": "Beginner",
      "text": "Display each employee with their latest salary and the highest latest salary in their department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  MAX(ls.salary) OVER (\n    PARTITION BY e.department_id\n  ) AS department_highest_salary\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use MAX() with OVER rather than GROUP BY.",
        "Partition the window by department_id.",
        "Work with one latest salary per employee."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "salary",
          "department_highest_salary"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 4,
      "difficulty": "Beginner",
      "text": "Display each employee with their latest salary and the lowest latest salary in their department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  MIN(ls.salary) OVER (\n    PARTITION BY e.department_id\n  ) AS department_lowest_salary\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use MIN() as a window aggregate.",
        "Partition by department.",
        "Do not collapse the employee rows."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "salary",
          "department_lowest_salary"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 5,
      "difficulty": "Beginner",
      "text": "Display each employee with the total number of employees in their department.",
      "sql": "SELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  COUNT(*) OVER (\n    PARTITION BY e.department_id\n  ) AS department_employee_count\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id;",
      "hints": [
        "COUNT(*) can also be used as a window function.",
        "Partition the count by department_id.",
        "No GROUP BY is needed."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "department_employee_count"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 6,
      "difficulty": "Ranking",
      "text": "Rank employees by their latest salary from highest to lowest.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  ls.salary,\n  RANK() OVER (\n    ORDER BY ls.salary DESC\n  ) AS salary_rank\nFROM employees AS e\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use only each employee's latest salary.",
        "RANK() requires ORDER BY inside OVER().",
        "Sort salaries descending within the window."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "salary_rank"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 7,
      "difficulty": "Ranking",
      "text": "Rank employees by their latest salary within each department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  RANK() OVER (\n    PARTITION BY e.department_id\n    ORDER BY ls.salary DESC\n  ) AS department_salary_rank\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Partition the ranking by department.",
        "Order salaries from highest to lowest.",
        "Use one latest salary per employee."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "department_salary_rank"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 8,
      "difficulty": "Ranking",
      "text": "Assign a row number to employees within each department based on latest salary from highest to lowest.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  ROW_NUMBER() OVER (\n    PARTITION BY e.department_id\n    ORDER BY ls.salary DESC, e.employee_id\n  ) AS department_row_number\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use ROW_NUMBER() in the final query.",
        "Partition by department.",
        "Add employee_id as a tie-breaker for deterministic numbering."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "department_row_number"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 9,
      "difficulty": "Ranking",
      "text": "Rank latest employee salaries within each department using DENSE_RANK().",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  DENSE_RANK() OVER (\n    PARTITION BY e.department_id\n    ORDER BY ls.salary DESC\n  ) AS dense_salary_rank\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use DENSE_RANK() instead of RANK().",
        "Partition by department.",
        "Equal salaries should receive the same rank without leaving gaps."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "dense_salary_rank"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 10,
      "difficulty": "Ranking",
      "text": "Compare ROW_NUMBER(), RANK(), and DENSE_RANK() on employees' latest salaries within each department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  ls.salary,\n  ROW_NUMBER() OVER (\n    PARTITION BY e.department_id\n    ORDER BY ls.salary DESC, e.employee_id\n  ) AS row_number_value,\n  RANK() OVER (\n    PARTITION BY e.department_id\n    ORDER BY ls.salary DESC\n  ) AS rank_value,\n  DENSE_RANK() OVER (\n    PARTITION BY e.department_id\n    ORDER BY ls.salary DESC\n  ) AS dense_rank_value\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "Use all three ranking functions in the same SELECT.",
        "Give them the same salary ordering for a fair comparison.",
        "ROW_NUMBER() may use employee_id as a tie-breaker."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "row_number_value",
          "rank_value",
          "dense_rank_value"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 11,
      "difficulty": "Previous and Next",
      "text": "Display each salary record with the employee's previous salary.",
      "sql": "SELECT\n  sh.salary_id,\n  sh.employee_id,\n  e.employee_name,\n  sh.effective_date,\n  sh.salary,\n  LAG(sh.salary) OVER (\n    PARTITION BY sh.employee_id\n    ORDER BY sh.effective_date, sh.salary_id\n  ) AS previous_salary\nFROM salaries AS sh\nINNER JOIN employees AS e\n  ON e.employee_id = sh.employee_id;",
      "hints": [
        "Use LAG() on salary.",
        "Partition by employee_id.",
        "Order each employee's records chronologically."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "salary_id",
          "employee_id",
          "effective_date",
          "salary",
          "previous_salary"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 12,
      "difficulty": "Previous and Next",
      "text": "Display each salary record with the employee's next salary.",
      "sql": "SELECT\n  sh.salary_id,\n  sh.employee_id,\n  e.employee_name,\n  sh.effective_date,\n  sh.salary,\n  LEAD(sh.salary) OVER (\n    PARTITION BY sh.employee_id\n    ORDER BY sh.effective_date, sh.salary_id\n  ) AS next_salary\nFROM salaries AS sh\nINNER JOIN employees AS e\n  ON e.employee_id = sh.employee_id;",
      "hints": [
        "Use LEAD() rather than LAG().",
        "Partition by employee.",
        "Order salary records from earliest to latest."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "salary_id",
          "employee_id",
          "effective_date",
          "salary",
          "next_salary"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 13,
      "difficulty": "Previous and Next",
      "text": "Calculate the salary increase amount for each employee salary record.",
      "sql": "WITH salary_changes AS (\n  SELECT\n    sh.salary_id,\n    sh.employee_id,\n    e.employee_name,\n    sh.effective_date,\n    sh.salary,\n    LAG(sh.salary) OVER (\n      PARTITION BY sh.employee_id\n      ORDER BY sh.effective_date, sh.salary_id\n    ) AS previous_salary\n  FROM salaries AS sh\n  INNER JOIN employees AS e\n    ON e.employee_id = sh.employee_id\n)\nSELECT\n  salary_id,\n  employee_id,\n  employee_name,\n  effective_date,\n  salary,\n  previous_salary,\n  salary - previous_salary AS salary_increase\nFROM salary_changes;",
      "hints": [
        "Use LAG() to bring the prior salary onto the same row.",
        "Subtract previous_salary from salary.",
        "The first record for each employee will have no increase value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "salary_id",
          "employee_id",
          "effective_date",
          "salary",
          "previous_salary",
          "salary_increase"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 14,
      "difficulty": "Previous and Next",
      "text": "Calculate the salary increase percentage for each employee salary record.",
      "sql": "WITH salary_changes AS (\n  SELECT\n    sh.salary_id,\n    sh.employee_id,\n    e.employee_name,\n    sh.effective_date,\n    sh.salary,\n    LAG(sh.salary) OVER (\n      PARTITION BY sh.employee_id\n      ORDER BY sh.effective_date, sh.salary_id\n    ) AS previous_salary\n  FROM salaries AS sh\n  INNER JOIN employees AS e\n    ON e.employee_id = sh.employee_id\n)\nSELECT\n  salary_id,\n  employee_id,\n  employee_name,\n  effective_date,\n  salary,\n  previous_salary,\n  ROUND(\n    100.0 * (salary - previous_salary) / NULLIF(previous_salary, 0),\n    2\n  ) AS salary_increase_percentage\nFROM salary_changes;",
      "hints": [
        "Calculate the previous salary with LAG().",
        "Divide the salary difference by the previous salary.",
        "Use 100.0 and NULLIF for a safe percentage."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "salary_id",
          "employee_id",
          "effective_date",
          "salary",
          "previous_salary",
          "salary_increase_percentage"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 15,
      "difficulty": "Previous and Next",
      "text": "Identify salary records where an employee's salary increased compared with their previous salary.",
      "sql": "WITH salary_changes AS (\n  SELECT\n    sh.salary_id,\n    sh.employee_id,\n    e.employee_name,\n    sh.effective_date,\n    sh.salary,\n    LAG(sh.salary) OVER (\n      PARTITION BY sh.employee_id\n      ORDER BY sh.effective_date, sh.salary_id\n    ) AS previous_salary\n  FROM salaries AS sh\n  INNER JOIN employees AS e\n    ON e.employee_id = sh.employee_id\n)\nSELECT\n  salary_id,\n  employee_id,\n  employee_name,\n  effective_date,\n  salary,\n  previous_salary\nFROM salary_changes\nWHERE salary > previous_salary;",
      "hints": [
        "Calculate the previous salary in a CTE or subquery.",
        "Window aliases cannot be filtered directly in the same SELECT level.",
        "Keep rows where the current salary is greater."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "salary_id"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 16,
      "difficulty": "Running Totals",
      "text": "Calculate the running total of all salary payments by effective date.",
      "sql": "SELECT\n  salary_id,\n  employee_id,\n  effective_date,\n  salary,\n  SUM(salary) OVER (\n    ORDER BY effective_date, salary_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_salary_total\nFROM salaries\nORDER BY effective_date, salary_id;",
      "hints": [
        "Use SUM(salary) as a window function.",
        "Order the window chronologically.",
        "Use a ROWS frame from the beginning through the current row."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "salary_id",
          "employee_id",
          "effective_date",
          "salary",
          "running_salary_total"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 17,
      "difficulty": "Running Totals",
      "text": "Calculate the running salary history for each employee.",
      "sql": "SELECT\n  salary_id,\n  employee_id,\n  effective_date,\n  salary,\n  SUM(salary) OVER (\n    PARTITION BY employee_id\n    ORDER BY effective_date, salary_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS employee_running_salary_total\nFROM salaries;",
      "hints": [
        "Partition the running total by employee_id.",
        "Order salary records chronologically.",
        "Use an explicit cumulative ROWS frame."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "salary_id",
          "employee_id",
          "effective_date",
          "salary",
          "employee_running_salary_total"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 18,
      "difficulty": "Running Totals",
      "text": "Calculate the cumulative number of employees hired over time.",
      "sql": "SELECT\n  employee_id,\n  employee_name,\n  hire_date,\n  COUNT(*) OVER (\n    ORDER BY hire_date, employee_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS cumulative_hires\nFROM employees\nORDER BY hire_date, employee_id;",
      "hints": [
        "Count rows using a window ordered by hire_date.",
        "Use employee_id as a tie-breaker.",
        "The cumulative count grows by one for each displayed employee."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "employee_id",
          "hire_date",
          "cumulative_hires"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 19,
      "difficulty": "Running Totals",
      "text": "Calculate cumulative hires within each department.",
      "sql": "SELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  e.hire_date,\n  COUNT(*) OVER (\n    PARTITION BY e.department_id\n    ORDER BY e.hire_date, e.employee_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS department_cumulative_hires\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id;",
      "hints": [
        "Partition the cumulative count by department.",
        "Order each department's employees by hire date.",
        "Use an explicit cumulative frame."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "hire_date",
          "department_cumulative_hires"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 20,
      "difficulty": "Running Totals",
      "text": "Calculate the cumulative latest salary cost within each department, ordered from earliest to latest hire date.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  d.department_name,\n  e.hire_date,\n  ls.salary,\n  SUM(ls.salary) OVER (\n    PARTITION BY e.department_id\n    ORDER BY e.hire_date, e.employee_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS cumulative_department_salary_cost\nFROM employees AS e\nINNER JOIN departments AS d\n  ON d.department_id = e.department_id\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.row_num = 1;",
      "hints": [
        "First isolate each employee's latest salary.",
        "Partition the running sum by department.",
        "Order employees by hire date within the department."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "hire_date",
          "salary",
          "cumulative_department_salary_cost"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 21,
      "difficulty": "Advanced",
      "text": "Identify the latest salary record for each employee.",
      "sql": "WITH ranked_salaries AS (\n  SELECT\n    sh.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries AS sh\n)\nSELECT\n  salary_id,\n  employee_id,\n  salary,\n  effective_date\nFROM ranked_salaries\nWHERE row_num = 1;",
      "hints": [
        "Rank salary records from latest to earliest within each employee.",
        "Use ROW_NUMBER() for one row per employee.",
        "Filter row_num = 1 in an outer query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "salary_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 22,
      "difficulty": "Advanced",
      "text": "Identify the first salary record for each employee.",
      "sql": "WITH ranked_salaries AS (\n  SELECT\n    sh.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date, salary_id\n    ) AS row_num\n  FROM salaries AS sh\n)\nSELECT\n  salary_id,\n  employee_id,\n  salary,\n  effective_date\nFROM ranked_salaries\nWHERE row_num = 1;",
      "hints": [
        "Order each employee's salary records from earliest to latest.",
        "Assign ROW_NUMBER().",
        "Keep the first-ranked record."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "salary_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 23,
      "difficulty": "Advanced",
      "text": "Identify employees who have more than one salary record.",
      "sql": "WITH salary_counts AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    COUNT(sh.salary_id) OVER (\n      PARTITION BY e.employee_id\n    ) AS salary_record_count\n  FROM employees AS e\n  INNER JOIN salaries AS sh\n    ON sh.employee_id = e.employee_id\n)\nSELECT DISTINCT\n  employee_id,\n  employee_name,\n  salary_record_count\nFROM salary_counts\nWHERE salary_record_count > 1;",
      "hints": [
        "Count salary rows with COUNT() OVER(PARTITION BY employee_id).",
        "Filter the calculated count in an outer query.",
        "Use DISTINCT because the window count repeats on every salary row."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 24,
      "difficulty": "Advanced",
      "text": "Identify employees whose latest salary is above their department's average latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n),\nsalary_comparison AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    AVG(ls.salary) OVER (\n      PARTITION BY e.department_id\n    ) AS department_average_salary\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.row_num = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary,\n  ROUND(department_average_salary, 2) AS department_average_salary\nFROM salary_comparison\nWHERE salary > department_average_salary;",
      "hints": [
        "First reduce salary history to one latest row per employee.",
        "Calculate department average salary with a window function.",
        "Filter the comparison in an outer query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 25,
      "difficulty": "Advanced",
      "text": "Identify the highest-paid employee or employees in each department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n),\nranked_employees AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    RANK() OVER (\n      PARTITION BY e.department_id\n      ORDER BY ls.salary DESC\n    ) AS salary_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.row_num = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary\nFROM ranked_employees\nWHERE salary_rank = 1;",
      "hints": [
        "Rank latest salaries within each department.",
        "Use RANK() so ties can be returned.",
        "Filter rank 1 in an outer query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 26,
      "difficulty": "Advanced",
      "text": "Identify the second-highest distinct latest salary in each department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n),\nranked_employees AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id\n      ORDER BY ls.salary DESC\n    ) AS salary_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.row_num = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary\nFROM ranked_employees\nWHERE salary_rank = 2;",
      "hints": [
        "Use DENSE_RANK() for distinct salary levels.",
        "Partition by department.",
        "Filter the second rank in an outer query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 27,
      "difficulty": "Advanced",
      "text": "Identify the top two latest salary levels in each department.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n),\nranked_employees AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id\n      ORDER BY ls.salary DESC\n    ) AS salary_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.row_num = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary,\n  salary_rank\nFROM ranked_employees\nWHERE salary_rank <= 2;",
      "hints": [
        "Rank distinct salary levels within departments.",
        "Use DENSE_RANK() if tied employees should all appear.",
        "Keep ranks 1 and 2."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 28,
      "difficulty": "Advanced",
      "text": "Identify the first employee hired in each department.",
      "sql": "WITH ranked_hires AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    e.hire_date,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.department_id\n      ORDER BY e.hire_date, e.employee_id\n    ) AS hire_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  hire_date\nFROM ranked_hires\nWHERE hire_rank = 1;",
      "hints": [
        "Partition employees by department.",
        "Order hire dates from earliest to latest.",
        "Use ROW_NUMBER() and keep rank 1."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 29,
      "difficulty": "Advanced",
      "text": "Identify the most recently hired employee in each department.",
      "sql": "WITH ranked_hires AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    e.hire_date,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.department_id\n      ORDER BY e.hire_date DESC, e.employee_id DESC\n    ) AS hire_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  hire_date\nFROM ranked_hires\nWHERE hire_rank = 1;",
      "hints": [
        "Partition employees by department.",
        "Order hire dates descending.",
        "Filter the first row per department."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 30,
      "difficulty": "Advanced",
      "text": "Calculate the gap between each employee's latest salary and their department's average latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n),\nsalary_analysis AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    AVG(ls.salary) OVER (\n      PARTITION BY e.department_id\n    ) AS department_average_salary\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.row_num = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary,\n  ROUND(department_average_salary, 2) AS department_average_salary,\n  ROUND(salary - department_average_salary, 2) AS salary_gap\nFROM salary_analysis;",
      "hints": [
        "Calculate department average salary without losing employee rows.",
        "Use latest salary records only.",
        "Subtract the department average from each salary."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "salary",
          "department_average_salary",
          "salary_gap"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 31,
      "difficulty": "Interview Style",
      "text": "Explain why a window function alias cannot be referenced directly in the WHERE clause by returning employees above their department average through a CTE.",
      "sql": "WITH salary_analysis AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    sh.salary,\n    AVG(sh.salary) OVER (\n      PARTITION BY e.department_id\n    ) AS department_average_salary\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN salaries AS sh\n    ON sh.employee_id = e.employee_id\n  WHERE sh.effective_date = (\n    SELECT MAX(sh2.effective_date)\n    FROM salaries AS sh2\n    WHERE sh2.employee_id = sh.employee_id\n  )\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary,\n  ROUND(department_average_salary, 2) AS department_average_salary\nFROM salary_analysis\nWHERE salary > department_average_salary;",
      "hints": [
        "WHERE is evaluated before the SELECT list creates its aliases.",
        "Calculate the window alias in a CTE or subquery first.",
        "Filter that alias in the outer query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "conceptual-demo",
        "requiredColumns": [
          "employee_id",
          "department_name",
          "salary",
          "department_average_salary"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 32,
      "difficulty": "Interview Style",
      "text": "Identify the highest-paid employee in each department using a CTE and window functions.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n),\ndepartment_ranking AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    RANK() OVER (\n      PARTITION BY e.department_id\n      ORDER BY ls.salary DESC\n    ) AS department_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.latest_rank = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary\nFROM department_ranking\nWHERE department_rank = 1;",
      "hints": [
        "Use one CTE to isolate latest salaries.",
        "Use another CTE to rank them by department.",
        "Filter rank 1 in the final query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 33,
      "difficulty": "Interview Style",
      "text": "Identify employees whose latest salary is higher than their manager's latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  e_ls.salary AS employee_salary,\n  m.employee_id AS manager_id,\n  m.employee_name AS manager_name,\n  m_ls.salary AS manager_salary\nFROM employees AS e\nINNER JOIN employees AS m\n  ON m.employee_id = e.manager_id\nINNER JOIN latest_salaries AS e_ls\n  ON e_ls.employee_id = e.employee_id\n AND e_ls.row_num = 1\nINNER JOIN latest_salaries AS m_ls\n  ON m_ls.employee_id = m.employee_id\n AND m_ls.row_num = 1\nWHERE e_ls.salary > m_ls.salary;",
      "hints": [
        "Join employees to the employees table again to find managers.",
        "Use a CTE that provides one latest salary per person.",
        "Compare the employee salary with the manager salary."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id"
        ],
        "optionalColumns": [
          "employee_name",
          "manager_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 34,
      "difficulty": "Interview Style",
      "text": "Identify departments where the highest latest salary is more than 20% above the department's average latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS row_num\n  FROM salaries\n),\ndepartment_metrics AS (\n  SELECT DISTINCT\n    d.department_id,\n    d.department_name,\n    MAX(ls.salary) OVER (\n      PARTITION BY e.department_id\n    ) AS highest_salary,\n    AVG(ls.salary) OVER (\n      PARTITION BY e.department_id\n    ) AS average_salary\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.row_num = 1\n)\nSELECT\n  department_id,\n  department_name,\n  highest_salary,\n  ROUND(average_salary, 2) AS average_salary,\n  ROUND(100.0 * (highest_salary - average_salary) / average_salary, 2) AS percent_above_average\nFROM department_metrics\nWHERE highest_salary > average_salary * 1.20;",
      "hints": [
        "Calculate department maximum and average as window metrics.",
        "Use DISTINCT to reduce repeated department metrics.",
        "Compare the maximum with 120% of the average."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "department_id"
        ],
        "optionalColumns": [
          "department_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 35,
      "difficulty": "Interview Style",
      "text": "Identify the latest salary for each employee without using MAX() in the final SELECT statement.",
      "sql": "WITH ranked_salaries AS (\n  SELECT\n    sh.salary_id,\n    sh.employee_id,\n    e.employee_name,\n    sh.salary,\n    sh.effective_date,\n    ROW_NUMBER() OVER (\n      PARTITION BY sh.employee_id\n      ORDER BY sh.effective_date DESC, sh.salary_id DESC\n    ) AS row_num\n  FROM salaries AS sh\n  INNER JOIN employees AS e\n    ON e.employee_id = sh.employee_id\n)\nSELECT\n  salary_id,\n  employee_id,\n  employee_name,\n  salary,\n  effective_date\nFROM ranked_salaries\nWHERE row_num = 1;",
      "hints": [
        "Rank salary rows from latest to earliest within each employee.",
        "ROW_NUMBER() removes the need for MAX() in the final SELECT.",
        "Filter the ranking result in an outer query."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "salary"
        ],
        "optionalColumns": [
          "employee_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    }
  ]
};
