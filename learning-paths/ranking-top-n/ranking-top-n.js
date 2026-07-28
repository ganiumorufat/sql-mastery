window.SQL_MASTERY_MODULE = {
  "id": "ranking-top-n",
  "title": "ranking & top-n",
  "learningPath": 8,
  "questionCount": 20,
  "database": "../../databases/ranking-top-n.sqlite",
  "storageKey": "sqlMasteryRankingTopNV2",
  "patternGoal": {
    "recognize": [
      "top",
      "highest",
      "lowest",
      "best",
      "worst",
      "first",
      "latest",
      "second",
      "third",
      "per group"
    ],
    "think": [
      "ROW_NUMBER()",
      "RANK()",
      "DENSE_RANK()",
      "ORDER BY",
      "PARTITION BY"
    ]
  },
  "frameworkPrompts": [
    "What metric determines the ranking?",
    "Is the ranking overall or within each group?",
    "Should tied values share the same rank?",
    "Do you need exactly N rows or N distinct ranking levels?",
    "What ordering direction is required?",
    "Is a tie-breaker needed for deterministic output?",
    "Must the metric be aggregated before ranking?",
    "Should the ranking result be filtered in a CTE or subquery?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Identify the most expensive product.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  category,\n  price\nFROM products\nWHERE price = (\n  SELECT MAX(price)\n  FROM products\n);",
      "hints": [
        "Find the maximum product price.",
        "Compare each product with that maximum.",
        "Use equality so tied products are preserved."
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
      "num": 2,
      "difficulty": "Beginner",
      "text": "Identify the least expensive product.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  category,\n  price\nFROM products\nWHERE price = (\n  SELECT MIN(price)\n  FROM products\n);",
      "hints": [
        "Find the minimum product price.",
        "Compare products with that value.",
        "Equality preserves ties."
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
      "num": 3,
      "difficulty": "Beginner",
      "text": "Identify the three most expensive products.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  category,\n  price\nFROM products\nORDER BY price DESC, product_id\nLIMIT 3;",
      "hints": [
        "Sort products from highest to lowest price.",
        "Use LIMIT 3 in SQLite.",
        "Add a tie-breaker for stable ordering."
      ],
      "orderSensitive": true,
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
        "orderSensitive": true
      }
    },
    {
      "num": 4,
      "difficulty": "Beginner",
      "text": "Identify the most expensive product in each category.",
      "sql": "WITH ranked_products AS (\n  SELECT\n    product_id,\n    product_name,\n    category,\n    price,\n    RANK() OVER (\n      PARTITION BY category\n      ORDER BY price DESC\n    ) AS price_rank\n  FROM products\n)\nSELECT\n  product_id,\n  product_name,\n  category,\n  price\nFROM ranked_products\nWHERE price_rank = 1;",
      "hints": [
        "Rank products within each category.",
        "Partition by category and order price descending.",
        "Keep rank 1."
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
      "difficulty": "Beginner",
      "text": "Identify the two most expensive products in each category.",
      "sql": "WITH ranked_products AS (\n  SELECT\n    product_id,\n    product_name,\n    category,\n    price,\n    ROW_NUMBER() OVER (\n      PARTITION BY category\n      ORDER BY price DESC, product_id\n    ) AS row_num\n  FROM products\n)\nSELECT\n  product_id,\n  product_name,\n  category,\n  price,\n  row_num\nFROM ranked_products\nWHERE row_num <= 2;",
      "hints": [
        "Assign row numbers within each category.",
        "Order by price descending.",
        "Keep the first two rows per category."
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
      "num": 6,
      "difficulty": "Customer & Product Rankings",
      "text": "Identify the customer who generated the highest total revenue.",
      "sql": "WITH customer_revenue AS (\n  SELECT\n    c.customer_id,\n    c.customer_name,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM customers AS c\n  INNER JOIN orders AS o\n    ON o.customer_id = c.customer_id\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY c.customer_id, c.customer_name\n),\nranked_customers AS (\n  SELECT\n    *,\n    RANK() OVER (\n      ORDER BY total_revenue DESC\n    ) AS revenue_rank\n  FROM customer_revenue\n)\nSELECT\n  customer_id,\n  customer_name,\n  ROUND(total_revenue, 2) AS total_revenue\nFROM ranked_customers\nWHERE revenue_rank = 1;",
      "hints": [
        "Calculate total revenue per customer first.",
        "Rank those totals from highest to lowest.",
        "Keep rank 1."
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
      "num": 7,
      "difficulty": "Customer & Product Rankings",
      "text": "Identify the top three customers by total revenue.",
      "sql": "WITH customer_revenue AS (\n  SELECT\n    c.customer_id,\n    c.customer_name,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM customers AS c\n  INNER JOIN orders AS o\n    ON o.customer_id = c.customer_id\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY c.customer_id, c.customer_name\n)\nSELECT\n  customer_id,\n  customer_name,\n  ROUND(total_revenue, 2) AS total_revenue\nFROM customer_revenue\nORDER BY total_revenue DESC, customer_id\nLIMIT 3;",
      "hints": [
        "Aggregate revenue per customer.",
        "Sort totals descending.",
        "Use LIMIT 3."
      ],
      "orderSensitive": true,
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
        "orderSensitive": true
      }
    },
    {
      "num": 8,
      "difficulty": "Customer & Product Rankings",
      "text": "Identify the highest-revenue customer in each country.",
      "sql": "WITH customer_revenue AS (\n  SELECT\n    c.customer_id,\n    c.customer_name,\n    c.country,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM customers AS c\n  INNER JOIN orders AS o\n    ON o.customer_id = c.customer_id\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY c.customer_id, c.customer_name, c.country\n),\nranked_customers AS (\n  SELECT\n    *,\n    RANK() OVER (\n      PARTITION BY country\n      ORDER BY total_revenue DESC\n    ) AS revenue_rank\n  FROM customer_revenue\n)\nSELECT\n  customer_id,\n  customer_name,\n  country,\n  ROUND(total_revenue, 2) AS total_revenue\nFROM ranked_customers\nWHERE revenue_rank = 1;",
      "hints": [
        "Calculate customer revenue and include country.",
        "Partition the ranking by country.",
        "Keep rank 1 in each country."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
        ],
        "optionalColumns": [
          "customer_name",
          "country"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 9,
      "difficulty": "Customer & Product Rankings",
      "text": "Identify the product with the highest quantity sold.",
      "sql": "WITH product_sales AS (\n  SELECT\n    p.product_id,\n    p.product_name,\n    SUM(oi.quantity) AS total_quantity_sold\n  FROM products AS p\n  INNER JOIN order_items AS oi\n    ON oi.product_id = p.product_id\n  GROUP BY p.product_id, p.product_name\n),\nranked_products AS (\n  SELECT\n    *,\n    RANK() OVER (\n      ORDER BY total_quantity_sold DESC\n    ) AS sales_rank\n  FROM product_sales\n)\nSELECT\n  product_id,\n  product_name,\n  total_quantity_sold\nFROM ranked_products\nWHERE sales_rank = 1;",
      "hints": [
        "Sum quantity by product.",
        "Rank product totals descending.",
        "Use RANK() to preserve ties."
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
    },
    {
      "num": 10,
      "difficulty": "Customer & Product Rankings",
      "text": "Identify the best-selling product by quantity in each category.",
      "sql": "WITH product_sales AS (\n  SELECT\n    p.product_id,\n    p.product_name,\n    p.category,\n    SUM(oi.quantity) AS total_quantity_sold\n  FROM products AS p\n  INNER JOIN order_items AS oi\n    ON oi.product_id = p.product_id\n  GROUP BY p.product_id, p.product_name, p.category\n),\nranked_products AS (\n  SELECT\n    *,\n    RANK() OVER (\n      PARTITION BY category\n      ORDER BY total_quantity_sold DESC\n    ) AS sales_rank\n  FROM product_sales\n)\nSELECT\n  product_id,\n  product_name,\n  category,\n  total_quantity_sold\nFROM ranked_products\nWHERE sales_rank = 1;",
      "hints": [
        "Aggregate quantity by product and category.",
        "Partition the ranking by category.",
        "Keep the top rank."
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
      "num": 11,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the latest order placed by each customer.",
      "sql": "WITH ranked_orders AS (\n  SELECT\n    o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date DESC, order_id DESC\n    ) AS order_rank\n  FROM orders AS o\n)\nSELECT\n  order_id,\n  customer_id,\n  order_date,\n  status\nFROM ranked_orders\nWHERE order_rank = 1;",
      "hints": [
        "Partition orders by customer.",
        "Order dates from latest to earliest.",
        "Keep row number 1."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
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
      "num": 12,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the first order placed by each customer.",
      "sql": "WITH ranked_orders AS (\n  SELECT\n    o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date, order_id\n    ) AS order_rank\n  FROM orders AS o\n)\nSELECT\n  order_id,\n  customer_id,\n  order_date,\n  status\nFROM ranked_orders\nWHERE order_rank = 1;",
      "hints": [
        "Partition by customer.",
        "Order from earliest to latest.",
        "Keep row number 1."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
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
      "num": 13,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the second order placed by each customer.",
      "sql": "WITH ranked_orders AS (\n  SELECT\n    o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date, order_id\n    ) AS order_rank\n  FROM orders AS o\n)\nSELECT\n  order_id,\n  customer_id,\n  order_date,\n  status\nFROM ranked_orders\nWHERE order_rank = 2;",
      "hints": [
        "Number each customer's orders chronologically.",
        "Use ROW_NUMBER() for one precise second order.",
        "Filter row number 2."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
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
      "num": 14,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the highest-paid employee in each department using each employee's latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n),\nranked_employees AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    RANK() OVER (\n      PARTITION BY e.department_id\n      ORDER BY ls.salary DESC\n    ) AS salary_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.latest_rank = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary\nFROM ranked_employees\nWHERE salary_rank = 1;",
      "hints": [
        "First isolate each employee's latest salary.",
        "Rank employees within department by salary.",
        "Keep rank 1."
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
      "num": 15,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the second-highest-paid employee in each department using distinct latest salary levels.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n),\nranked_employees AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    ls.salary,\n    DENSE_RANK() OVER (\n      PARTITION BY e.department_id\n      ORDER BY ls.salary DESC\n    ) AS salary_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.latest_rank = 1\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  salary\nFROM ranked_employees\nWHERE salary_rank = 2;",
      "hints": [
        "Use latest salary records only.",
        "DENSE_RANK() is appropriate for distinct salary levels.",
        "Filter rank 2."
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
      "num": 16,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the most recently hired employee in each department.",
      "sql": "WITH ranked_hires AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    e.hire_date,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.department_id\n      ORDER BY e.hire_date DESC, e.employee_id DESC\n    ) AS hire_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  hire_date\nFROM ranked_hires\nWHERE hire_rank = 1;",
      "hints": [
        "Partition employees by department.",
        "Order hire dates descending.",
        "Keep the first row in each department."
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
      "num": 17,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the longest-serving employee in each department.",
      "sql": "WITH ranked_hires AS (\n  SELECT\n    e.employee_id,\n    e.employee_name,\n    d.department_name,\n    e.hire_date,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.department_id\n      ORDER BY e.hire_date, e.employee_id\n    ) AS hire_rank\n  FROM employees AS e\n  INNER JOIN departments AS d\n    ON d.department_id = e.department_id\n)\nSELECT\n  employee_id,\n  employee_name,\n  department_name,\n  hire_date\nFROM ranked_hires\nWHERE hire_rank = 1;",
      "hints": [
        "Longest-serving means earliest hire date.",
        "Partition by department.",
        "Order hire dates ascending and keep row 1."
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
      "num": 18,
      "difficulty": "Order & Employee Rankings",
      "text": "Identify the two departments with the highest average latest salary.",
      "sql": "WITH latest_salaries AS (\n  SELECT\n    employee_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY employee_id\n      ORDER BY effective_date DESC, salary_id DESC\n    ) AS latest_rank\n  FROM salaries\n),\ndepartment_averages AS (\n  SELECT\n    d.department_id,\n    d.department_name,\n    AVG(ls.salary) AS average_salary\n  FROM departments AS d\n  INNER JOIN employees AS e\n    ON e.department_id = d.department_id\n  INNER JOIN latest_salaries AS ls\n    ON ls.employee_id = e.employee_id\n   AND ls.latest_rank = 1\n  GROUP BY d.department_id, d.department_name\n)\nSELECT\n  department_id,\n  department_name,\n  ROUND(average_salary, 2) AS average_salary\nFROM department_averages\nORDER BY average_salary DESC, department_id\nLIMIT 2;",
      "hints": [
        "Use one latest salary per employee.",
        "Calculate average salary by department.",
        "Sort descending and keep two departments."
      ],
      "orderSensitive": true,
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
        "orderSensitive": true
      }
    },
    {
      "num": 19,
      "difficulty": "Advanced",
      "text": "Identify all products tied for the highest total revenue.",
      "sql": "WITH product_revenue AS (\n  SELECT\n    p.product_id,\n    p.product_name,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM products AS p\n  INNER JOIN order_items AS oi\n    ON oi.product_id = p.product_id\n  GROUP BY p.product_id, p.product_name\n),\nranked_products AS (\n  SELECT\n    *,\n    RANK() OVER (\n      ORDER BY total_revenue DESC\n    ) AS revenue_rank\n  FROM product_revenue\n)\nSELECT\n  product_id,\n  product_name,\n  ROUND(total_revenue, 2) AS total_revenue\nFROM ranked_products\nWHERE revenue_rank = 1;",
      "hints": [
        "Calculate revenue by product.",
        "Use RANK() so tied products receive the same top rank.",
        "Keep rank 1."
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
    },
    {
      "num": 20,
      "difficulty": "Advanced",
      "text": "Demonstrate when to use RANK() instead of ROW_NUMBER() by comparing both functions on products ordered by price.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  category,\n  price,\n  ROW_NUMBER() OVER (\n    ORDER BY price DESC, product_id\n  ) AS row_number_value,\n  RANK() OVER (\n    ORDER BY price DESC\n  ) AS rank_value\nFROM products\nORDER BY price DESC, product_id;",
      "hints": [
        "Use both functions in the same query.",
        "ROW_NUMBER() gives every row a unique sequence.",
        "RANK() gives tied prices the same rank and may leave gaps."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "conceptual-demo",
        "requiredColumns": [
          "product_id",
          "category",
          "price",
          "row_number_value",
          "rank_value"
        ],
        "optionalColumns": [
          "product_name"
        ],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    }
  ]
};
