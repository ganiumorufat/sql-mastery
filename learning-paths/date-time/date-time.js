window.SQL_MASTERY_MODULE = {
  "id": "date-time",
  "title": "date & time",
  "learningPath": 7,
  "questionCount": 20,
  "database": "../../databases/date-time.sqlite",
  "storageKey": "sqlMasteryDateTimeV2",
  "patternGoal": {
    "recognize": [
      "monthly",
      "yearly",
      "last 30 days",
      "before",
      "after",
      "between",
      "tenure",
      "growth",
      "previous month"
    ],
    "think": [
      "strftime()",
      "date()",
      "julianday()",
      "LAG()",
      "GROUP BY month",
      "recursive calendar CTE"
    ]
  },
  "frameworkPrompts": [
    "What date grain is required: day, month, or year?",
    "Which table contains the event date?",
    "Does the task compare two dates or group dates?",
    "Should the calculation include only dates after a starting event?",
    "Is a first or latest date required?",
    "Does the task require LAG() for a previous period or event?",
    "Must missing calendar periods be generated explicitly?",
    "Which SQLite date function best matches the task?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Calculate the number of customers who signed up each month.",
      "sql": "SELECT\n  strftime('%Y-%m', signup_date) AS signup_month,\n  COUNT(*) AS customer_count\nFROM customers\nGROUP BY strftime('%Y-%m', signup_date)\nORDER BY signup_month;",
      "hints": [
        "Convert each signup date to a year-month value.",
        "Use strftime('%Y-%m', signup_date) in SQLite.",
        "Group and order by the same month expression."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "signup_month",
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
      "num": 2,
      "difficulty": "Beginner",
      "text": "Calculate the number of orders placed each month.",
      "sql": "SELECT\n  strftime('%Y-%m', order_date) AS order_month,\n  COUNT(*) AS order_count\nFROM orders\nGROUP BY strftime('%Y-%m', order_date)\nORDER BY order_month;",
      "hints": [
        "Extract the year and month from order_date.",
        "Count orders within each month.",
        "Order the result chronologically."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "order_month",
          "order_count"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 3,
      "difficulty": "Beginner",
      "text": "Calculate total revenue by month.",
      "sql": "SELECT\n  strftime('%Y-%m', o.order_date) AS revenue_month,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM orders AS o\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY strftime('%Y-%m', o.order_date)\nORDER BY revenue_month;",
      "hints": [
        "Join orders to order_items to combine dates with line-item revenue.",
        "Revenue is quantity multiplied by unit_price.",
        "Group by the order year and month."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "grouped-metric",
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
      "num": 4,
      "difficulty": "Beginner",
      "text": "Identify customers who signed up during June.",
      "sql": "SELECT\n  customer_id,\n  customer_name,\n  signup_date\nFROM customers\nWHERE strftime('%m', signup_date) = '06';",
      "hints": [
        "Extract the month number from signup_date.",
        "June is represented as '06'.",
        "No aggregation is required."
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
      "num": 5,
      "difficulty": "Beginner",
      "text": "Identify orders placed during July.",
      "sql": "SELECT\n  order_id,\n  customer_id,\n  order_date,\n  status\nFROM orders\nWHERE strftime('%m', order_date) = '07';",
      "hints": [
        "Use strftime('%m', order_date).",
        "July is month '07'.",
        "Return the matching order details."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "order_id"
        ],
        "optionalColumns": [
          "status"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 6,
      "difficulty": "Easy",
      "text": "Identify employees hired during 2024.",
      "sql": "SELECT\n  employee_id,\n  employee_name,\n  department_id,\n  hire_date\nFROM employees\nWHERE strftime('%Y', hire_date) = '2024';",
      "hints": [
        "Extract the year from hire_date.",
        "Compare it with '2024'.",
        "Return employee details for the matching year."
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
      "num": 7,
      "difficulty": "Easy",
      "text": "Calculate each employee's tenure in completed years as of 2026-07-28.",
      "sql": "SELECT\n  employee_id,\n  employee_name,\n  hire_date,\n  CAST(\n    strftime('%Y', '2026-07-28') - strftime('%Y', hire_date)\n    - (strftime('%m-%d', '2026-07-28') < strftime('%m-%d', hire_date))\n    AS INTEGER\n  ) AS tenure_years\nFROM employees;",
      "hints": [
        "Compare the reference date with each hire date.",
        "Start with the difference between the calendar years.",
        "Subtract one when the employee's anniversary has not yet occurred."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "employee_id",
          "hire_date",
          "tenure_years"
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
      "num": 8,
      "difficulty": "Easy",
      "text": "Identify orders placed within 30 days after the customer's signup date.",
      "sql": "SELECT\n  o.order_id,\n  o.customer_id,\n  c.customer_name,\n  c.signup_date,\n  o.order_date,\n  CAST(julianday(o.order_date) - julianday(c.signup_date) AS INTEGER) AS days_after_signup\nFROM orders AS o\nINNER JOIN customers AS c\n  ON c.customer_id = o.customer_id\nWHERE julianday(o.order_date) - julianday(c.signup_date) BETWEEN 0 AND 30;",
      "hints": [
        "Join orders to customers.",
        "Use julianday() to calculate the difference between two dates.",
        "Keep differences from 0 through 30 days."
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
      "num": 9,
      "difficulty": "Easy",
      "text": "Identify customers who placed their first order during the same calendar month in which they signed up.",
      "sql": "WITH first_orders AS (\n  SELECT\n    customer_id,\n    MIN(order_date) AS first_order_date\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT\n  c.customer_id,\n  c.customer_name,\n  c.signup_date,\n  f.first_order_date\nFROM customers AS c\nINNER JOIN first_orders AS f\n  ON f.customer_id = c.customer_id\nWHERE strftime('%Y-%m', f.first_order_date)\n    = strftime('%Y-%m', c.signup_date);",
      "hints": [
        "First calculate the minimum order date per customer.",
        "Compare the year-month of that date with the signup year-month.",
        "Use a CTE to keep the steps readable."
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
      "num": 10,
      "difficulty": "Easy",
      "text": "Identify customers who have never placed an order on or after their signup date.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  c.signup_date\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND date(o.order_date) >= date(c.signup_date)\n);",
      "hints": [
        "Start from all customers.",
        "Use a correlated NOT EXISTS subquery against orders.",
        "Only orders on or after signup should count."
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
      "num": 11,
      "difficulty": "Intermediate",
      "text": "Calculate the month-over-month change in revenue.",
      "sql": "WITH monthly_revenue AS (\n  SELECT\n    strftime('%Y-%m', o.order_date) AS revenue_month,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY strftime('%Y-%m', o.order_date)\n),\nrevenue_with_previous AS (\n  SELECT\n    revenue_month,\n    total_revenue,\n    LAG(total_revenue) OVER (\n      ORDER BY revenue_month\n    ) AS previous_month_revenue\n  FROM monthly_revenue\n)\nSELECT\n  revenue_month,\n  ROUND(total_revenue, 2) AS total_revenue,\n  ROUND(previous_month_revenue, 2) AS previous_month_revenue,\n  ROUND(total_revenue - previous_month_revenue, 2) AS revenue_change\nFROM revenue_with_previous\nORDER BY revenue_month;",
      "hints": [
        "First calculate one revenue total per month.",
        "Use LAG() to bring in the previous month's revenue.",
        "Subtract the previous value from the current value."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "revenue_month",
          "total_revenue",
          "previous_month_revenue",
          "revenue_change"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 12,
      "difficulty": "Intermediate",
      "text": "Calculate the month-over-month revenue growth percentage.",
      "sql": "WITH monthly_revenue AS (\n  SELECT\n    strftime('%Y-%m', o.order_date) AS revenue_month,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY strftime('%Y-%m', o.order_date)\n),\nrevenue_with_previous AS (\n  SELECT\n    revenue_month,\n    total_revenue,\n    LAG(total_revenue) OVER (\n      ORDER BY revenue_month\n    ) AS previous_month_revenue\n  FROM monthly_revenue\n)\nSELECT\n  revenue_month,\n  ROUND(total_revenue, 2) AS total_revenue,\n  ROUND(previous_month_revenue, 2) AS previous_month_revenue,\n  ROUND(\n    100.0 * (total_revenue - previous_month_revenue)\n    / NULLIF(previous_month_revenue, 0),\n    2\n  ) AS revenue_growth_percentage\nFROM revenue_with_previous\nORDER BY revenue_month;",
      "hints": [
        "Use the monthly revenue and previous-month logic from Question 11.",
        "Divide the revenue change by previous-month revenue.",
        "Use NULLIF to prevent division by zero."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "revenue_month",
          "total_revenue",
          "previous_month_revenue",
          "revenue_growth_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 13,
      "difficulty": "Intermediate",
      "text": "Identify the first order date for each customer.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  MIN(o.order_date) AS first_order_date\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\nGROUP BY c.customer_id, c.customer_name;",
      "hints": [
        "Use MIN(order_date) for the earliest order.",
        "Group by customer.",
        "Use LEFT JOIN so customers without orders remain visible."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id",
          "first_order_date"
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
      "num": 14,
      "difficulty": "Intermediate",
      "text": "Identify the most recent order date for each customer.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  MAX(o.order_date) AS most_recent_order_date\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\nGROUP BY c.customer_id, c.customer_name;",
      "hints": [
        "Use MAX(order_date) for the latest date.",
        "Group by customer.",
        "Preserve customers without orders with LEFT JOIN."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id",
          "most_recent_order_date"
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
      "num": 15,
      "difficulty": "Intermediate",
      "text": "Identify customers whose first order was placed within 30 days after signup.",
      "sql": "WITH first_orders AS (\n  SELECT\n    customer_id,\n    MIN(order_date) AS first_order_date\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT\n  c.customer_id,\n  c.customer_name,\n  c.signup_date,\n  f.first_order_date,\n  CAST(julianday(f.first_order_date) - julianday(c.signup_date) AS INTEGER) AS days_to_first_order\nFROM customers AS c\nINNER JOIN first_orders AS f\n  ON f.customer_id = c.customer_id\nWHERE julianday(f.first_order_date) - julianday(c.signup_date) BETWEEN 0 AND 30;",
      "hints": [
        "Calculate one first-order date per customer.",
        "Use julianday() to measure the delay after signup.",
        "Keep customers with delays from 0 through 30 days."
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
      "num": 16,
      "difficulty": "Advanced",
      "text": "Identify employees who were hired before their manager.",
      "sql": "SELECT\n  e.employee_id,\n  e.employee_name,\n  e.hire_date AS employee_hire_date,\n  m.employee_id AS manager_id,\n  m.employee_name AS manager_name,\n  m.hire_date AS manager_hire_date\nFROM employees AS e\nINNER JOIN employees AS m\n  ON m.employee_id = e.manager_id\nWHERE date(e.hire_date) < date(m.hire_date);",
      "hints": [
        "Join employees to the employees table again.",
        "Use manager_id to find the manager row.",
        "Compare the employee and manager hire dates."
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
      "num": 17,
      "difficulty": "Advanced",
      "text": "Calculate the average number of days between customer signup and first order.",
      "sql": "WITH first_orders AS (\n  SELECT\n    customer_id,\n    MIN(order_date) AS first_order_date\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT\n  ROUND(\n    AVG(julianday(f.first_order_date) - julianday(c.signup_date)),\n    2\n  ) AS average_days_to_first_order\nFROM customers AS c\nINNER JOIN first_orders AS f\n  ON f.customer_id = c.customer_id\nWHERE date(f.first_order_date) >= date(c.signup_date);",
      "hints": [
        "First calculate each customer's earliest order date.",
        "Measure the date difference with julianday().",
        "Average only non-negative signup-to-order intervals."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "average_days_to_first_order"
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
      "difficulty": "Advanced",
      "text": "Calculate the average number of days between consecutive orders for each customer.",
      "sql": "WITH order_gaps AS (\n  SELECT\n    customer_id,\n    order_id,\n    order_date,\n    LAG(order_date) OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date, order_id\n    ) AS previous_order_date\n  FROM orders\n)\nSELECT\n  customer_id,\n  ROUND(\n    AVG(julianday(order_date) - julianday(previous_order_date)),\n    2\n  ) AS average_days_between_orders\nFROM order_gaps\nWHERE previous_order_date IS NOT NULL\nGROUP BY customer_id;",
      "hints": [
        "Use LAG() to find the previous order date within each customer.",
        "Calculate the gap between current and previous dates.",
        "Exclude the first order before averaging by customer."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id",
          "average_days_between_orders"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 19,
      "difficulty": "Advanced",
      "text": "Identify months with no orders from January 2023 through December 2026.",
      "sql": "WITH RECURSIVE calendar_months(month_start) AS (\n  SELECT date('2023-01-01')\n  UNION ALL\n  SELECT date(month_start, '+1 month')\n  FROM calendar_months\n  WHERE month_start < date('2026-12-01')\n),\norders_by_month AS (\n  SELECT\n    date(order_date, 'start of month') AS month_start,\n    COUNT(*) AS order_count\n  FROM orders\n  GROUP BY date(order_date, 'start of month')\n)\nSELECT\n  strftime('%Y-%m', c.month_start) AS order_month\nFROM calendar_months AS c\nLEFT JOIN orders_by_month AS o\n  ON o.month_start = c.month_start\nWHERE COALESCE(o.order_count, 0) = 0\nORDER BY order_month;",
      "hints": [
        "Generate a complete month calendar with a recursive CTE.",
        "Aggregate existing orders by month.",
        "LEFT JOIN the calendar and keep months with a zero count."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "order_month"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 20,
      "difficulty": "Advanced",
      "text": "Generate a monthly revenue report from January 2023 through December 2026 that includes months with zero revenue.",
      "sql": "WITH RECURSIVE calendar_months(month_start) AS (\n  SELECT date('2023-01-01')\n  UNION ALL\n  SELECT date(month_start, '+1 month')\n  FROM calendar_months\n  WHERE month_start < date('2026-12-01')\n),\nmonthly_revenue AS (\n  SELECT\n    date(o.order_date, 'start of month') AS month_start,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY date(o.order_date, 'start of month')\n)\nSELECT\n  strftime('%Y-%m', c.month_start) AS revenue_month,\n  ROUND(COALESCE(m.total_revenue, 0), 2) AS total_revenue\nFROM calendar_months AS c\nLEFT JOIN monthly_revenue AS m\n  ON m.month_start = c.month_start\nORDER BY revenue_month;",
      "hints": [
        "Create a calendar containing every reporting month.",
        "Calculate actual monthly revenue separately.",
        "LEFT JOIN the calendar and replace missing revenue with zero."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "single-metric",
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
    }
  ]
};
