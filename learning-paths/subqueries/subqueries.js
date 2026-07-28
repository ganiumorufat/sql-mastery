window.SQL_MASTERY_MODULE = {
  "id": "subqueries",
  "title": "subqueries",
  "learningPath": 4,
  "questionCount": 20,
  "database": "../../databases/ecommerce.sqlite",
  "storageKey": "sqlMasterySubqueriesV2",
  "patternGoal": {
    "recognize": [
      "above average",
      "greater than all",
      "not in",
      "exists",
      "does not exist",
      "compared to overall"
    ],
    "think": [
      "Subquery",
      "EXISTS",
      "NOT EXISTS",
      "IN",
      "NOT IN"
    ]
  },
  "frameworkPrompts": [
    "What result must the inner query return?",
    "Is the subquery scalar, list-based, or correlated?",
    "Should the outer query use WHERE or HAVING?",
    "Would EXISTS or NOT EXISTS express the relationship more safely?",
    "Could NULL values make NOT IN unsafe?",
    "Does the subquery need aggregation?",
    "Should ties be preserved?",
    "Is DISTINCT needed in the outer result?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Identify products priced above the average product price.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  price\nFROM products\nWHERE price > (\n  SELECT AVG(price)\n  FROM products\n);",
      "hints": [
        "Calculate the overall average product price in a subquery.",
        "Compare each product's price with the subquery result.",
        "Use the subquery inside the WHERE clause."
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
      "num": 2,
      "difficulty": "Beginner",
      "text": "Identify customers who have placed at least one order using EXISTS.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  c.country\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n);",
      "hints": [
        "Start from the customers table.",
        "Use a correlated EXISTS subquery against orders.",
        "Match orders.customer_id to the current customer."
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
      "num": 3,
      "difficulty": "Beginner",
      "text": "Identify customers who have never placed an order using NOT EXISTS.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  c.country\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n);",
      "hints": [
        "Start from all customers.",
        "Use NOT EXISTS to reject customers with a matching order.",
        "Correlate the subquery using customer_id."
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
      "num": 4,
      "difficulty": "Beginner",
      "text": "Identify products that have been ordered using IN.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  price\nFROM products\nWHERE product_id IN (\n  SELECT product_id\n  FROM order_items\n);",
      "hints": [
        "The order_items table contains product IDs that appeared in purchases.",
        "Return products whose product_id belongs to that list.",
        "Use IN with a single-column subquery."
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
      "num": 5,
      "difficulty": "Beginner",
      "text": "Identify products that have never been ordered using NOT EXISTS.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  p.price\nFROM products AS p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM order_items AS oi\n  WHERE oi.product_id = p.product_id\n);",
      "hints": [
        "Start from the products table.",
        "Look for products without a matching row in order_items.",
        "NOT EXISTS is safer than NOT IN when NULL values may be present."
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
      "num": 6,
      "difficulty": "Easy",
      "text": "Identify orders whose total revenue is above the average order revenue.",
      "sql": "SELECT\n  oi.order_id,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS order_revenue\nFROM order_items AS oi\nGROUP BY oi.order_id\nHAVING SUM(oi.quantity * oi.unit_price) > (\n  SELECT AVG(order_total)\n  FROM (\n    SELECT\n      SUM(quantity * unit_price) AS order_total\n    FROM order_items\n    GROUP BY order_id\n  )\n);",
      "hints": [
        "First calculate one revenue total per order.",
        "The comparison value is the average of those order totals.",
        "Use HAVING because the filter applies after aggregation."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "order_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 7,
      "difficulty": "Easy",
      "text": "Identify customers whose total revenue is above the average customer revenue.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS customer_revenue\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(oi.quantity * oi.unit_price) > (\n  SELECT AVG(customer_total)\n  FROM (\n    SELECT\n      o2.customer_id,\n      SUM(oi2.quantity * oi2.unit_price) AS customer_total\n    FROM orders AS o2\n    INNER JOIN order_items AS oi2\n      ON oi2.order_id = o2.order_id\n    GROUP BY o2.customer_id\n  )\n);",
      "hints": [
        "Aggregate revenue by customer in the outer query.",
        "Build a subquery that calculates one revenue total per customer.",
        "Compare each customer total with the average of those totals."
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
      "num": 8,
      "difficulty": "Easy",
      "text": "Identify products whose total quantity sold is above the average quantity sold per product.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  SUM(oi.quantity) AS total_quantity_sold\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nGROUP BY p.product_id, p.product_name\nHAVING SUM(oi.quantity) > (\n  SELECT AVG(product_quantity)\n  FROM (\n    SELECT\n      product_id,\n      SUM(quantity) AS product_quantity\n    FROM order_items\n    GROUP BY product_id\n  )\n);",
      "hints": [
        "Calculate total quantity for each product.",
        "The benchmark is the average of all product quantity totals.",
        "Use HAVING to compare aggregated quantities."
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
      "num": 9,
      "difficulty": "Easy",
      "text": "Identify product categories whose average product price is above the overall average product price.",
      "sql": "SELECT\n  category,\n  ROUND(AVG(price), 2) AS category_average_price\nFROM products\nGROUP BY category\nHAVING AVG(price) > (\n  SELECT AVG(price)\n  FROM products\n);",
      "hints": [
        "Calculate average price by category.",
        "The comparison value is the overall average product price.",
        "Use HAVING because AVG(price) is an aggregate."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "category"
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
      "difficulty": "Easy",
      "text": "Identify countries with more customers than the average number of customers per country.",
      "sql": "SELECT\n  country,\n  COUNT(*) AS customer_count\nFROM customers\nGROUP BY country\nHAVING COUNT(*) > (\n  SELECT AVG(country_count)\n  FROM (\n    SELECT\n      country,\n      COUNT(*) AS country_count\n    FROM customers\n    GROUP BY country\n  )\n);",
      "hints": [
        "Count customers within each country.",
        "Build a subquery that returns one count per country.",
        "Compare each country count with the average count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "country"
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
      "difficulty": "Intermediate",
      "text": "Identify the most expensive product using a subquery.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  price\nFROM products\nWHERE price = (\n  SELECT MAX(price)\n  FROM products\n);",
      "hints": [
        "Find the maximum product price in a scalar subquery.",
        "Compare each product price with that value.",
        "Using equality preserves ties."
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
      "num": 12,
      "difficulty": "Intermediate",
      "text": "Identify customers who have purchased the most expensive product.",
      "sql": "SELECT DISTINCT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nWHERE oi.product_id IN (\n  SELECT product_id\n  FROM products\n  WHERE price = (\n    SELECT MAX(price)\n    FROM products\n  )\n);",
      "hints": [
        "First identify the product or products with the maximum price.",
        "Find order items containing those product IDs.",
        "Use DISTINCT because a customer may purchase the product more than once."
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
      "num": 13,
      "difficulty": "Intermediate",
      "text": "Identify orders that include products priced above the average product price.",
      "sql": "SELECT DISTINCT\n  oi.order_id\nFROM order_items AS oi\nWHERE oi.product_id IN (\n  SELECT product_id\n  FROM products\n  WHERE price > (\n    SELECT AVG(price)\n    FROM products\n  )\n);",
      "hints": [
        "Create a subquery that returns above-average product IDs.",
        "Check which order items contain those products.",
        "Use DISTINCT so each order appears once."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "order_id"
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
      "difficulty": "Intermediate",
      "text": "Identify customers who have purchased Electronics products.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.category = 'Electronics'\n);",
      "hints": [
        "Use a correlated EXISTS subquery from customers.",
        "Inside the subquery, connect orders, order_items, and products.",
        "Filter for the Electronics category."
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
      "num": 15,
      "difficulty": "Intermediate",
      "text": "Identify customers who have never purchased Electronics products.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.category = 'Electronics'\n);",
      "hints": [
        "Start from all customers.",
        "Search for a matching Electronics purchase in a correlated subquery.",
        "Use NOT EXISTS to keep customers without such a purchase."
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
      "text": "Identify customers who have purchased products from every product category.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM (\n    SELECT DISTINCT category\n    FROM products\n  ) AS pc\n  WHERE NOT EXISTS (\n    SELECT 1\n    FROM orders AS o\n    INNER JOIN order_items AS oi\n      ON oi.order_id = o.order_id\n    INNER JOIN products AS p\n      ON p.product_id = oi.product_id\n    WHERE o.customer_id = c.customer_id\n      AND p.category = pc.category\n  )\n);",
      "hints": [
        "This is a relational division problem.",
        "For each customer, test whether any category is missing.",
        "Use a double NOT EXISTS: no category should lack a matching purchase."
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
      "num": 17,
      "difficulty": "Advanced",
      "text": "Identify products purchased by every customer from Canada.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name\nFROM products AS p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM customers AS c\n  WHERE c.country = 'Canada'\n    AND NOT EXISTS (\n      SELECT 1\n      FROM orders AS o\n      INNER JOIN order_items AS oi\n        ON oi.order_id = o.order_id\n      WHERE o.customer_id = c.customer_id\n        AND oi.product_id = p.product_id\n    )\n);",
      "hints": [
        "Treat this as another relational division problem.",
        "For each product, look for a Canadian customer who did not buy it.",
        "Keep products for which no such customer exists."
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
        "orderSensitive": false,
        "emptyResultSqlGroups": [
          [
            "\\bproducts?\\b"
          ],
          [
            "\\bcustomers?\\b"
          ],
          [
            "\\bcanada\\b"
          ],
          [
            "\\b(orders?|order_items?)\\b"
          ],
          [
            "\\b(not\\s+exists|count\\s*\\(\\s*distinct|having)\\b"
          ]
        ]
      }
    },
    {
      "num": 18,
      "difficulty": "Advanced",
      "text": "Identify customers whose first order was placed in June.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  (\n    SELECT MIN(o.order_date)\n    FROM orders AS o\n    WHERE o.customer_id = c.customer_id\n  ) AS first_order_date\nFROM customers AS c\nWHERE strftime('%m', (\n  SELECT MIN(o2.order_date)\n  FROM orders AS o2\n  WHERE o2.customer_id = c.customer_id\n)) = '06';",
      "hints": [
        "Use a correlated scalar subquery to find each customer's earliest order date.",
        "Extract the month from that minimum date.",
        "Keep only customers whose first-order month is June."
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
      "num": 19,
      "difficulty": "Advanced",
      "text": "Identify customers whose latest order has a status of Completed.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE (\n  SELECT o.status\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n  ORDER BY o.order_date DESC, o.order_id DESC\n  LIMIT 1\n) = 'Completed';",
      "hints": [
        "Use a correlated subquery to inspect one customer's orders.",
        "Order the subquery from latest to earliest.",
        "Return one status with LIMIT 1 and compare it with Completed."
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
      "difficulty": "Advanced",
      "text": "Identify orders containing more items than the average order.",
      "sql": "SELECT\n  order_id,\n  SUM(quantity) AS total_items\nFROM order_items\nGROUP BY order_id\nHAVING SUM(quantity) > (\n  SELECT AVG(order_items_count)\n  FROM (\n    SELECT\n      order_id,\n      SUM(quantity) AS order_items_count\n    FROM order_items\n    GROUP BY order_id\n  )\n);",
      "hints": [
        "Define items as the sum of quantity within each order.",
        "Calculate the average of those per-order item totals.",
        "Use HAVING to keep orders above that average."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "order_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    }
  ]
};
