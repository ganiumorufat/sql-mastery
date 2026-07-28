window.SQL_MASTERY_MODULE = {
  "id": "advanced-sql",
  "title": "advanced sql",
  "learningPath": 10,
  "questionCount": 20,
  "database": "../../databases/advanced-sql.sqlite",
  "storageKey": "sqlMasteryAdvancedSqlV2",
  "patternGoal": {
    "recognize": [
      "consecutive",
      "gaps",
      "islands",
      "retention",
      "cohort",
      "funnel",
      "median",
      "percentile",
      "session",
      "hierarchy"
    ],
    "think": [
      "LAG()",
      "cohort month",
      "conditional aggregation",
      "ROW_NUMBER()",
      "NTILE()",
      "recursive CTE",
      "pivot",
      "unpivot"
    ]
  },
  "frameworkPrompts": [
    "What business event or sequence is being analysed?",
    "What grain should the intermediate dataset use?",
    "Does the task require previous-row comparison with LAG()?",
    "Is a cohort or funnel denominator required?",
    "How should ties or percentile positions be handled?",
    "Does the report require pivoting or unpivoting?",
    "Is recursion required to traverse a hierarchy?",
    "What threshold defines a meaningful gap, decline, or retention event?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Time Series & Customer Activity",
      "text": "Identify customers who placed orders in consecutive months.",
      "sql": "WITH customer_months AS (\n  SELECT DISTINCT\n    customer_id,\n    date(order_date, 'start of month') AS order_month\n  FROM orders\n),\nmonth_sequence AS (\n  SELECT\n    customer_id,\n    order_month,\n    LAG(order_month) OVER (\n      PARTITION BY customer_id\n      ORDER BY order_month\n    ) AS previous_month\n  FROM customer_months\n)\nSELECT DISTINCT\n  c.customer_id,\n  c.customer_name\nFROM month_sequence AS m\nINNER JOIN customers AS c\n  ON c.customer_id = m.customer_id\nWHERE date(m.previous_month, '+1 month') = m.order_month;",
      "hints": [
        "Reduce the data to one row per customer and order month.",
        "Use LAG() to retrieve the previous active month.",
        "Check whether the current month is exactly one month later."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
        ],
        "optionalColumns": [
          "customer_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 2,
      "difficulty": "Time Series & Customer Activity",
      "text": "Identify customers who placed at least two orders within a 30-day period.",
      "sql": "WITH ordered_activity AS (\n  SELECT\n    customer_id,\n    order_id,\n    order_date,\n    LAG(order_date) OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date, order_id\n    ) AS previous_order_date\n  FROM orders\n)\nSELECT DISTINCT\n  c.customer_id,\n  c.customer_name\nFROM ordered_activity AS a\nINNER JOIN customers AS c\n  ON c.customer_id = a.customer_id\nWHERE a.previous_order_date IS NOT NULL\n  AND julianday(a.order_date) - julianday(a.previous_order_date) <= 30;",
      "hints": [
        "Order each customer's activity chronologically.",
        "Use LAG() to compare each order with the previous one.",
        "Keep customers whose gap is 30 days or less."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
        ],
        "optionalColumns": [
          "customer_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 3,
      "difficulty": "Time Series & Customer Activity",
      "text": "Calculate the time gap between consecutive orders for each customer.",
      "sql": "WITH order_activity AS (\n  SELECT\n    customer_id,\n    order_id,\n    order_date,\n    LAG(order_date) OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date, order_id\n    ) AS previous_order_date\n  FROM orders\n)\nSELECT\n  customer_id,\n  order_id,\n  order_date,\n  previous_order_date,\n  CAST(\n    julianday(order_date) - julianday(previous_order_date)\n    AS INTEGER\n  ) AS days_since_previous_order\nFROM order_activity;",
      "hints": [
        "Use LAG() to bring the previous order date onto each row.",
        "Partition by customer.",
        "Use julianday() to calculate the difference in days."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id",
          "order_id",
          "order_date",
          "previous_order_date",
          "days_since_previous_order"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 4,
      "difficulty": "Time Series & Customer Activity",
      "text": "Identify products that recorded no sales during June 2024.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  p.category\nFROM products AS p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM order_items AS oi\n  INNER JOIN orders AS o\n    ON o.order_id = oi.order_id\n  WHERE oi.product_id = p.product_id\n    AND strftime('%Y-%m', o.order_date) = '2024-06'\n);",
      "hints": [
        "Start from all products.",
        "Search for matching sales in the target month.",
        "Use NOT EXISTS to keep products without a June 2024 sale."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "product_id"
        ],
        "optionalColumns": [
          "product_name",
          "category"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 5,
      "difficulty": "Cohort & Retention Analysis",
      "text": "Build customer cohorts based on their first purchase month.",
      "sql": "WITH first_purchases AS (\n  SELECT\n    customer_id,\n    MIN(order_date) AS first_purchase_date\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT\n  strftime('%Y-%m', first_purchase_date) AS cohort_month,\n  COUNT(*) AS customer_count\nFROM first_purchases\nGROUP BY strftime('%Y-%m', first_purchase_date)\nORDER BY cohort_month;",
      "hints": [
        "Find each customer's earliest order date.",
        "Convert that date to a year-month cohort.",
        "Count customers in each cohort."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "cohort_month",
          "customer_count"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 6,
      "difficulty": "Cohort & Retention Analysis",
      "text": "Calculate first-month customer retention.",
      "sql": "WITH first_purchases AS (\n  SELECT\n    customer_id,\n    date(MIN(order_date), 'start of month') AS cohort_month\n  FROM orders\n  GROUP BY customer_id\n),\nretention AS (\n  SELECT\n    f.customer_id,\n    f.cohort_month,\n    MAX(\n      CASE\n        WHEN date(o.order_date, 'start of month')\n             = date(f.cohort_month, '+1 month')\n        THEN 1 ELSE 0\n      END\n    ) AS retained_month_1\n  FROM first_purchases AS f\n  LEFT JOIN orders AS o\n    ON o.customer_id = f.customer_id\n  GROUP BY f.customer_id, f.cohort_month\n)\nSELECT\n  strftime('%Y-%m', cohort_month) AS cohort_month,\n  COUNT(*) AS cohort_size,\n  SUM(retained_month_1) AS retained_customers,\n  ROUND(\n    100.0 * SUM(retained_month_1) / NULLIF(COUNT(*), 0),\n    2\n  ) AS first_month_retention_rate\nFROM retention\nGROUP BY cohort_month\nORDER BY cohort_month;",
      "hints": [
        "Define each customer's cohort as their first purchase month.",
        "Check whether they ordered again in the following month.",
        "Divide retained customers by cohort size."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "cohort_month",
          "cohort_size",
          "retained_customers",
          "first_month_retention_rate"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 7,
      "difficulty": "Cohort & Retention Analysis",
      "text": "Calculate second-month customer retention.",
      "sql": "WITH first_purchases AS (\n  SELECT\n    customer_id,\n    date(MIN(order_date), 'start of month') AS cohort_month\n  FROM orders\n  GROUP BY customer_id\n),\nretention AS (\n  SELECT\n    f.customer_id,\n    f.cohort_month,\n    MAX(\n      CASE\n        WHEN date(o.order_date, 'start of month')\n             = date(f.cohort_month, '+2 months')\n        THEN 1 ELSE 0\n      END\n    ) AS retained_month_2\n  FROM first_purchases AS f\n  LEFT JOIN orders AS o\n    ON o.customer_id = f.customer_id\n  GROUP BY f.customer_id, f.cohort_month\n)\nSELECT\n  strftime('%Y-%m', cohort_month) AS cohort_month,\n  COUNT(*) AS cohort_size,\n  SUM(retained_month_2) AS retained_customers,\n  ROUND(\n    100.0 * SUM(retained_month_2) / NULLIF(COUNT(*), 0),\n    2\n  ) AS second_month_retention_rate\nFROM retention\nGROUP BY cohort_month\nORDER BY cohort_month;",
      "hints": [
        "Use the first purchase month as the cohort.",
        "Look for activity exactly two months later.",
        "Calculate the retained percentage by cohort."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "cohort_month",
          "cohort_size",
          "retained_customers",
          "second_month_retention_rate"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 8,
      "difficulty": "Cohort & Retention Analysis",
      "text": "Build a customer conversion funnel showing Signed Up, Placed an Order, and Completed an Order.",
      "sql": "SELECT\n  'Signed Up' AS funnel_stage,\n  COUNT(*) AS customer_count\nFROM customers\n\nUNION ALL\n\nSELECT\n  'Placed an Order' AS funnel_stage,\n  COUNT(DISTINCT customer_id) AS customer_count\nFROM orders\n\nUNION ALL\n\nSELECT\n  'Completed an Order' AS funnel_stage,\n  COUNT(DISTINCT customer_id) AS customer_count\nFROM orders\nWHERE status = 'Completed';",
      "hints": [
        "Each funnel stage should return one label and one count.",
        "Use distinct customers for order-based stages.",
        "Combine the stages with UNION ALL."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "funnel_stage",
          "customer_count"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 9,
      "difficulty": "Cohort & Retention Analysis",
      "text": "Calculate the conversion rate from customer signup to first order.",
      "sql": "SELECT\n  COUNT(*) AS signed_up_customers,\n  COUNT(DISTINCT o.customer_id) AS customers_with_orders,\n  ROUND(\n    100.0 * COUNT(DISTINCT o.customer_id)\n    / NULLIF(COUNT(DISTINCT c.customer_id), 0),\n    2\n  ) AS signup_to_first_order_conversion_rate\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id;",
      "hints": [
        "The denominator is all signed-up customers.",
        "The numerator is customers with at least one order.",
        "Count distinct customer IDs."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "signed_up_customers",
          "customers_with_orders",
          "signup_to_first_order_conversion_rate"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 10,
      "difficulty": "Cohort & Retention Analysis",
      "text": "Calculate the conversion rate from order placement to Completed order.",
      "sql": "SELECT\n  COUNT(*) AS total_orders,\n  SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_orders,\n  ROUND(\n    100.0 * SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END)\n    / NULLIF(COUNT(*), 0),\n    2\n  ) AS order_to_completed_conversion_rate\nFROM orders;",
      "hints": [
        "The denominator is all placed orders.",
        "Use conditional aggregation for Completed orders.",
        "Convert the ratio to a percentage."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "total_orders",
          "completed_orders",
          "order_to_completed_conversion_rate"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 11,
      "difficulty": "Statistical Analysis",
      "text": "Calculate the median product price.",
      "sql": "WITH ranked_prices AS (\n  SELECT\n    price,\n    ROW_NUMBER() OVER (ORDER BY price) AS row_num,\n    COUNT(*) OVER () AS total_rows\n  FROM products\n)\nSELECT ROUND(AVG(price), 2) AS median_product_price\nFROM ranked_prices\nWHERE row_num IN (\n  CAST((total_rows + 1) / 2 AS INTEGER),\n  CAST((total_rows + 2) / 2 AS INTEGER)\n);",
      "hints": [
        "Sort product prices and number the rows.",
        "Count the total rows in the same result.",
        "Average the middle one or two values."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "median_product_price"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 12,
      "difficulty": "Statistical Analysis",
      "text": "Calculate the median latest employee salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n),\nranked_values AS (\n  SELECT\n    salary,\n    ROW_NUMBER() OVER (ORDER BY salary) AS row_num,\n    COUNT(*) OVER () AS total_rows\n  FROM latest_salaries\n  WHERE latest_rank = 1\n)\nSELECT ROUND(AVG(salary), 2) AS median_employee_salary\nFROM ranked_values\nWHERE row_num IN (\n  CAST((total_rows + 1) / 2 AS INTEGER),\n  CAST((total_rows + 2) / 2 AS INTEGER)\n);",
      "hints": [
        "Use one latest salary per employee.",
        "Rank those values from lowest to highest.",
        "Average the middle salary value or values."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "median_employee_salary"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 13,
      "difficulty": "Statistical Analysis",
      "text": "Calculate the 90th percentile of latest employee salaries using the nearest-rank method.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n),\nranked_values AS (\n  SELECT\n    salary,\n    ROW_NUMBER() OVER (ORDER BY salary) AS row_num,\n    COUNT(*) OVER () AS total_rows\n  FROM latest_salaries\n  WHERE latest_rank = 1\n)\nSELECT salary AS percentile_90_salary\nFROM ranked_values\nWHERE row_num = CAST((90 * total_rows + 99) / 100 AS INTEGER);",
      "hints": [
        "Use latest salary values only.",
        "Sort and number the values in ascending order.",
        "Apply the nearest-rank position for the 90th percentile."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "percentile_90_salary"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 14,
      "difficulty": "Statistical Analysis",
      "text": "Divide employees' latest salaries into quartiles using NTILE().",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n)\nSELECT\n  e.employee_id,\n  e.employee_name,\n  ls.salary,\n  NTILE(4) OVER (\n    ORDER BY ls.salary\n  ) AS salary_quartile\nFROM employees AS e\nINNER JOIN latest_salaries AS ls\n  ON ls.employee_id = e.employee_id\n AND ls.latest_rank = 1;",
      "hints": [
        "Isolate latest salaries first.",
        "Use NTILE(4).",
        "Order salaries from lowest to highest."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "employee_id",
          "salary_quartile"
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
      "difficulty": "Advanced Reporting",
      "text": "Pivot 2024 monthly revenue into separate month columns.",
      "sql": "SELECT\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '01'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS january,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '02'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS february,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '03'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS march,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '04'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS april,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '05'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS may,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '06'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS june,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '07'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS july,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '08'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS august,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '09'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS september,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '10'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS october,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '11'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS november,\n  ROUND(SUM(CASE WHEN strftime('%m', o.order_date) = '12'\n                 THEN oi.quantity * oi.unit_price ELSE 0 END), 2) AS december\nFROM orders AS o\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nWHERE strftime('%Y', o.order_date) = '2024';",
      "hints": [
        "Use conditional aggregation for each month.",
        "Filter the source data to 2024.",
        "Each month becomes one output column."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 16,
      "difficulty": "Advanced Reporting",
      "text": "Unpivot the 2024 monthly revenue columns back into rows.",
      "sql": "WITH monthly_pivot AS (\n  SELECT\n    SUM(CASE WHEN strftime('%m', o.order_date) = '01'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS january,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '02'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS february,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '03'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS march,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '04'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS april,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '05'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS may,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '06'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS june,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '07'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS july,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '08'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS august,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '09'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS september,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '10'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS october,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '11'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS november,\n    SUM(CASE WHEN strftime('%m', o.order_date) = '12'\n             THEN oi.quantity * oi.unit_price ELSE 0 END) AS december\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  WHERE strftime('%Y', o.order_date) = '2024'\n)\nSELECT 'January' AS revenue_month, ROUND(january, 2) AS total_revenue FROM monthly_pivot\nUNION ALL SELECT 'February', ROUND(february, 2) FROM monthly_pivot\nUNION ALL SELECT 'March', ROUND(march, 2) FROM monthly_pivot\nUNION ALL SELECT 'April', ROUND(april, 2) FROM monthly_pivot\nUNION ALL SELECT 'May', ROUND(may, 2) FROM monthly_pivot\nUNION ALL SELECT 'June', ROUND(june, 2) FROM monthly_pivot\nUNION ALL SELECT 'July', ROUND(july, 2) FROM monthly_pivot\nUNION ALL SELECT 'August', ROUND(august, 2) FROM monthly_pivot\nUNION ALL SELECT 'September', ROUND(september, 2) FROM monthly_pivot\nUNION ALL SELECT 'October', ROUND(october, 2) FROM monthly_pivot\nUNION ALL SELECT 'November', ROUND(november, 2) FROM monthly_pivot\nUNION ALL SELECT 'December', ROUND(december, 2) FROM monthly_pivot;",
      "hints": [
        "Create one pivoted row first.",
        "Turn each month column into a labelled row.",
        "Use UNION ALL because SQLite has no UNPIVOT operator."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "revenue_month",
          "total_revenue"
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
      "difficulty": "Recursive CTEs",
      "text": "Display the employee-management hierarchy using a recursive CTE.",
      "sql": "WITH RECURSIVE hierarchy AS (\n  SELECT\n    employee_id,\n    employee_name,\n    manager_id,\n    0 AS hierarchy_level,\n    employee_name AS hierarchy_path\n  FROM employees\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    e.manager_id,\n    h.hierarchy_level + 1,\n    h.hierarchy_path || ' > ' || e.employee_name\n  FROM employees AS e\n  INNER JOIN hierarchy AS h\n    ON e.manager_id = h.employee_id\n)\nSELECT\n  employee_id,\n  employee_name,\n  manager_id,\n  hierarchy_level,\n  hierarchy_path\nFROM hierarchy\nORDER BY hierarchy_path;",
      "hints": [
        "Start with employees who have no manager.",
        "Recursively join employees to the prior hierarchy level.",
        "Track depth and a readable hierarchy path."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "manager_id",
          "hierarchy_level",
          "hierarchy_path"
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
      "num": 18,
      "difficulty": "Recursive CTEs",
      "text": "Display the complete manager chain for every employee.",
      "sql": "WITH RECURSIVE manager_chain AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    e.manager_id,\n    m.employee_id AS current_manager_id,\n    m.employee_name AS current_manager_name,\n    1 AS chain_level\n  FROM employees AS e\n  INNER JOIN employees AS m\n    ON m.employee_id = e.manager_id\n\n  UNION ALL\n\n  SELECT\n    mc.employee_id,\n    mc.employee_name,\n    m.manager_id,\n    next_manager.employee_id,\n    next_manager.employee_name,\n    mc.chain_level + 1\n  FROM manager_chain AS mc\n  INNER JOIN employees AS m\n    ON m.employee_id = mc.current_manager_id\n  INNER JOIN employees AS next_manager\n    ON next_manager.employee_id = m.manager_id\n)\nSELECT\n  employee_id,\n  employee_name,\n  current_manager_id AS manager_id,\n  current_manager_name AS manager_name,\n  chain_level\nFROM manager_chain\nORDER BY employee_id, chain_level;",
      "hints": [
        "Begin with each employee's direct manager.",
        "Recursively move from the current manager to that manager's manager.",
        "Keep the original employee ID throughout the recursion."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "employee_id",
          "manager_id",
          "chain_level"
        ],
        "optionalColumns": [
          "employee_name",
          "manager_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 19,
      "difficulty": "Advanced Business Analysis",
      "text": "Identify customers with inactivity gaps greater than 90 days between consecutive orders.",
      "sql": "WITH order_gaps AS (\n  SELECT\n    customer_id,\n    order_id,\n    order_date,\n    LAG(order_date) OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date, order_id\n    ) AS previous_order_date\n  FROM orders\n)\nSELECT\n  c.customer_id,\n  c.customer_name,\n  g.previous_order_date,\n  g.order_date,\n  CAST(\n    julianday(g.order_date) - julianday(g.previous_order_date)\n    AS INTEGER\n  ) AS inactivity_days\nFROM order_gaps AS g\nINNER JOIN customers AS c\n  ON c.customer_id = g.customer_id\nWHERE julianday(g.order_date) - julianday(g.previous_order_date) > 90;",
      "hints": [
        "Use LAG() to locate each customer's previous order.",
        "Calculate the gap in days.",
        "Keep gaps greater than 90 days."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
        ],
        "optionalColumns": [
          "customer_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 20,
      "difficulty": "Advanced Business Analysis",
      "text": "Identify products with a month-over-month revenue decline greater than 30%.",
      "sql": "WITH product_monthly_revenue AS (\n  SELECT\n    p.product_id,\n    p.product_name,\n    strftime('%Y-%m', o.order_date) AS revenue_month,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM products AS p\n  INNER JOIN order_items AS oi\n    ON oi.product_id = p.product_id\n  INNER JOIN orders AS o\n    ON o.order_id = oi.order_id\n  GROUP BY\n    p.product_id,\n    p.product_name,\n    strftime('%Y-%m', o.order_date)\n),\nrevenue_changes AS (\n  SELECT\n    product_id,\n    product_name,\n    revenue_month,\n    total_revenue,\n    LAG(total_revenue) OVER (\n      PARTITION BY product_id\n      ORDER BY revenue_month\n    ) AS previous_month_revenue\n  FROM product_monthly_revenue\n)\nSELECT\n  product_id,\n  product_name,\n  revenue_month,\n  ROUND(previous_month_revenue, 2) AS previous_month_revenue,\n  ROUND(total_revenue, 2) AS current_month_revenue,\n  ROUND(\n    100.0 * (total_revenue - previous_month_revenue)\n    / NULLIF(previous_month_revenue, 0),\n    2\n  ) AS revenue_change_percentage\nFROM revenue_changes\nWHERE previous_month_revenue IS NOT NULL\n  AND 1.0 * (total_revenue - previous_month_revenue)\n      / NULLIF(previous_month_revenue, 0) < -0.30;",
      "hints": [
        "Calculate monthly revenue for each product.",
        "Use LAG() within each product to retrieve previous-month revenue.",
        "Keep percentage changes below -30%."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "product_id"
        ],
        "optionalColumns": [
          "product_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    }
  ]
};
