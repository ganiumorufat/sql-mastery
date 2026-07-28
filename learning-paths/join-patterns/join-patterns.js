window.SQL_MASTERY_MODULE = {
  "id": "join-patterns",
  "title": "join",
  "learningPath": 2,
  "questionCount": 40,
  "database": "../../databases/ecommerce.sqlite",
  "storageKey": "sqlMasteryJoinPatternsV2",
  "patternGoal": {
    "recognize": [
      "with",
      "without",
      "never",
      "matching",
      "missing",
      "belongs to",
      "placed by",
      "ordered by",
      "sold by"
    ],
    "think": [
      "INNER JOIN",
      "LEFT JOIN",
      "LEFT JOIN ... IS NULL",
      "EXISTS",
      "NOT EXISTS"
    ]
  },
  "frameworkPrompts": [
    "What should one row represent?",
    "Which table should be the starting table?",
    "Which table(s) must be connected?",
    "What columns form the join condition?",
    "Should unmatched rows be preserved?",
    "Would EXISTS or NOT EXISTS avoid duplicates?",
    "Is grouping required after the join?",
    "Could this join multiply rows?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Display customer information for each order.",
      "sql": "SELECT\n  o.order_id,\n  o.order_date,\n  o.status,\n  c.customer_id,\n  c.customer_name,\n  c.city,\n  c.country,\n  c.signup_date\nFROM orders AS o\nINNER JOIN customers AS c\n  ON c.customer_id = o.customer_id;",
      "hints": [
        "Each order belongs to one customer.",
        "Match orders.customer_id with customers.customer_id.",
        "Use an INNER JOIN from orders to customers."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "order_id",
          "order_date",
          "status",
          "customer_id",
          "city",
          "country",
          "signup_date"
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
      "difficulty": "Beginner",
      "text": "Display product information for each order item.",
      "sql": "SELECT\n  oi.order_item_id,\n  oi.order_id,\n  oi.quantity,\n  oi.unit_price,\n  p.product_id,\n  p.product_name,\n  p.category,\n  p.price\nFROM order_items AS oi\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id;",
      "hints": [
        "Each order item refers to one product.",
        "Match order_items.product_id with products.product_id.",
        "Use an INNER JOIN from order_items to products."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "order_item_id",
          "order_id",
          "quantity",
          "unit_price",
          "product_id",
          "category",
          "price"
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
      "num": 3,
      "difficulty": "Beginner",
      "text": "Display the product name, quantity ordered, and unit price for each order item.",
      "sql": "SELECT\n  p.product_name,\n  oi.quantity,\n  oi.unit_price\nFROM order_items AS oi\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id;",
      "hints": [
        "The quantity and unit price are stored in order_items.",
        "The product name is stored in products.",
        "Join the tables using product_id."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "product_name",
          "quantity",
          "unit_price"
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
      "difficulty": "Beginner",
      "text": "List each customer's order history, including the order date.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  o.order_id,\n  o.order_date,\n  o.status\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id;",
      "hints": [
        "Start with customers and connect their matching orders.",
        "The relationship uses customer_id.",
        "Select the customer, order ID, order date, and status."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id"
        ],
        "optionalColumns": [
          "customer_name",
          "status"
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
      "text": "Generate a detailed sales report showing the customer, product, quantity, and unit price for each purchase.",
      "sql": "SELECT\n  c.customer_name,\n  p.product_name,\n  oi.quantity,\n  oi.unit_price\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id;",
      "hints": [
        "The report needs four connected tables.",
        "Follow the path customers → orders → order_items → products.",
        "Use customer_id, order_id, and product_id as the join keys."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_name",
          "product_name",
          "quantity",
          "unit_price"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 6,
      "difficulty": "Easy",
      "text": "Display all customers and their orders, including customers who have never placed an order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  o.order_id,\n  o.order_date,\n  o.status\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id;",
      "hints": [
        "All customers must remain in the result.",
        "Place customers on the left side of the join.",
        "Use LEFT JOIN so customers without orders receive NULL order values."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "customer_id",
          "order_id",
          "order_date",
          "status"
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
      "difficulty": "Easy",
      "text": "Display all products and their order items, including products that have never been ordered.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  p.category,\n  oi.order_item_id,\n  oi.order_id,\n  oi.quantity,\n  oi.unit_price\nFROM products AS p\nLEFT JOIN order_items AS oi\n  ON oi.product_id = p.product_id;",
      "hints": [
        "All products must remain in the result.",
        "Place products on the left side of the join.",
        "Use LEFT JOIN so unordered products receive NULL order-item values."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "full-report",
        "requiredColumns": [
          "product_id",
          "category",
          "order_item_id",
          "order_id",
          "quantity",
          "unit_price"
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
      "num": 8,
      "difficulty": "Easy",
      "text": "List customers who have placed at least one order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n);",
      "hints": [
        "Check whether a matching order exists for each customer.",
        "Correlate orders.customer_id with customers.customer_id.",
        "Use EXISTS to avoid duplicate customer rows."
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
      "text": "List products that have been ordered at least once.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name\nFROM products AS p\nWHERE EXISTS (\n  SELECT 1\n  FROM order_items AS oi\n  WHERE oi.product_id = p.product_id\n);",
      "hints": [
        "Check whether each product has a matching order item.",
        "Correlate order_items.product_id with products.product_id.",
        "Use EXISTS to return each product only once."
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
      "difficulty": "Easy",
      "text": "Identify orders that contain at least one product.",
      "sql": "SELECT\n  o.order_id,\n  o.customer_id,\n  o.order_date,\n  o.status\nFROM orders AS o\nWHERE EXISTS (\n  SELECT 1\n  FROM order_items AS oi\n  WHERE oi.order_id = o.order_id\n);",
      "hints": [
        "An order contains a product when it has a matching order item.",
        "Correlate order_items.order_id with orders.order_id.",
        "Use EXISTS."
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
      "num": 11,
      "difficulty": "Intermediate",
      "text": "List customers who have never placed an order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\nWHERE o.order_id IS NULL;",
      "hints": [
        "Keep all customers, then look for missing order matches.",
        "Use LEFT JOIN from customers to orders.",
        "Filter with WHERE o.order_id IS NULL."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
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
      "num": 12,
      "difficulty": "Intermediate",
      "text": "List products that have never been ordered.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name\nFROM products AS p\nLEFT JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nWHERE oi.order_item_id IS NULL;",
      "hints": [
        "Keep all products, then look for missing order-item matches.",
        "Use LEFT JOIN from products to order_items.",
        "Filter with WHERE oi.order_item_id IS NULL."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
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
      "num": 13,
      "difficulty": "Intermediate",
      "text": "Identify customers who have placed at least one Completed order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'Completed'\n);",
      "hints": [
        "Check for a matching order with a specific status.",
        "The status condition belongs inside the correlated subquery.",
        "Use EXISTS with o.status = 'Completed'."
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
      "num": 14,
      "difficulty": "Intermediate",
      "text": "Identify customers who have at least one Cancelled order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'Cancelled'\n);",
      "hints": [
        "Check for a matching Cancelled order.",
        "Correlate the order with the current customer.",
        "Use EXISTS with o.status = 'Cancelled'."
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
      "text": "Identify customers who have at least one Pending order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'Pending'\n);",
      "hints": [
        "Check for a matching Pending order.",
        "Correlate the order with the current customer.",
        "Use EXISTS with o.status = 'Pending'."
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
      "difficulty": "Intermediate",
      "text": "Calculate the total revenue for each order.",
      "sql": "SELECT\n  o.order_id,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM orders AS o\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY o.order_id;",
      "hints": [
        "Join each order to its line items.",
        "Line revenue is quantity multiplied by unit price.",
        "Group by order_id and sum the line revenue."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "order_id",
          "total_revenue"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 17,
      "difficulty": "Intermediate",
      "text": "Calculate the total revenue generated by each customer.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY c.customer_id, c.customer_name;",
      "hints": [
        "Connect customers to orders and orders to order items.",
        "Calculate revenue from quantity × unit price.",
        "Group by the customer."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id",
          "total_revenue"
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
      "num": 18,
      "difficulty": "Intermediate",
      "text": "Calculate the total quantity sold for each product.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  SUM(oi.quantity) AS total_quantity_sold\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nGROUP BY p.product_id, p.product_name;",
      "hints": [
        "Connect each product to its order items.",
        "Add the quantity values for each product.",
        "Group by product_id and product_name."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "product_id",
          "total_quantity_sold"
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
      "num": 19,
      "difficulty": "Intermediate",
      "text": "Calculate total revenue by product category.",
      "sql": "SELECT\n  p.category,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nGROUP BY p.category;",
      "hints": [
        "Product category is stored in products.",
        "Revenue is calculated from order_items.",
        "Join on product_id and group by category."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "category",
          "total_revenue"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 20,
      "difficulty": "Intermediate",
      "text": "Calculate total revenue by country.",
      "sql": "SELECT\n  c.country,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY c.country;",
      "hints": [
        "Country comes from customers, while revenue comes from order_items.",
        "Connect customers → orders → order_items.",
        "Group by country and sum quantity × unit price."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "country",
          "total_revenue"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 21,
      "difficulty": "Advanced",
      "text": "Identify customers who signed up but have never placed an order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  c.signup_date\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n);",
      "hints": [
        "Start with every signed-up customer.",
        "Check that no matching order exists.",
        "Use NOT EXISTS correlated by customer_id."
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
      "num": 22,
      "difficulty": "Advanced",
      "text": "Identify products that have generated no sales revenue.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name\nFROM products AS p\nLEFT JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nGROUP BY p.product_id, p.product_name\nHAVING COALESCE(SUM(oi.quantity * oi.unit_price), 0) = 0;",
      "hints": [
        "Products with no matching items must remain visible.",
        "Use LEFT JOIN and calculate revenue by product.",
        "Keep groups whose COALESCE(SUM(...), 0) equals zero."
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
      "num": 23,
      "difficulty": "Advanced",
      "text": "Identify customers who have placed more than one order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  COUNT(o.order_id) AS order_count\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nGROUP BY c.customer_id, c.customer_name\nHAVING COUNT(o.order_id) > 1;",
      "hints": [
        "Join customers to their orders.",
        "Count orders for each customer.",
        "Use HAVING COUNT(o.order_id) > 1."
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
      "num": 24,
      "difficulty": "Advanced",
      "text": "Identify customers who have purchased Electronics products.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.category = 'Electronics'\n);",
      "hints": [
        "Trace the customer through orders and order items to products.",
        "Filter matching products to the Electronics category.",
        "Use EXISTS to return each customer once."
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
      "num": 25,
      "difficulty": "Advanced",
      "text": "Identify customers who have purchased both Electronics and Stationery products.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.category = 'Electronics'\n)\nAND EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.category = 'Stationery'\n);",
      "hints": [
        "The customer must satisfy two separate purchase conditions.",
        "Check once for Electronics and once for Stationery.",
        "Use two correlated EXISTS conditions joined with AND."
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
      "num": 26,
      "difficulty": "Advanced",
      "text": "Identify customers who have purchased the Laptop product.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.product_name = 'Laptop'\n);",
      "hints": [
        "Trace customers to the products in their orders.",
        "Filter the product name to Laptop.",
        "Use EXISTS so each matching customer appears once."
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
      "num": 27,
      "difficulty": "Advanced",
      "text": "Identify customers who have never purchased the Laptop product.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  INNER JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  INNER JOIN products AS p\n    ON p.product_id = oi.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.product_name = 'Laptop'\n);",
      "hints": [
        "The required pattern is the absence of a Laptop purchase.",
        "Build the matching purchase path inside a correlated subquery.",
        "Use NOT EXISTS."
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
      "num": 28,
      "difficulty": "Advanced",
      "text": "Identify customers who placed orders in July but not in June.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND strftime('%m', o.order_date) = '07'\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND strftime('%m', o.order_date) = '06'\n);",
      "hints": [
        "The customer needs a July match and must lack a June match.",
        "Use strftime('%m', order_date) to identify the month in SQLite.",
        "Combine EXISTS for July with NOT EXISTS for June."
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
      "num": 29,
      "difficulty": "Advanced",
      "text": "Identify customers who placed orders in both June and July.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND strftime('%m', o.order_date) = '06'\n)\nAND EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND strftime('%m', o.order_date) = '07'\n);",
      "hints": [
        "The customer must satisfy two separate month conditions.",
        "Check independently for a June order and a July order.",
        "Combine two correlated EXISTS conditions with AND."
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
      "num": 30,
      "difficulty": "Advanced",
      "text": "Identify products purchased by customers from Canada.",
      "sql": "SELECT DISTINCT\n  p.product_id,\n  p.product_name\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nINNER JOIN orders AS o\n  ON o.order_id = oi.order_id\nINNER JOIN customers AS c\n  ON c.customer_id = o.customer_id\nWHERE c.country = 'Canada';",
      "hints": [
        "Trace products back through order items and orders to customers.",
        "Filter customers to Canada.",
        "Use DISTINCT because the same product may be purchased many times."
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
      "num": 31,
      "difficulty": "Interview Style",
      "text": "Identify customers whose every order is Completed.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status <> 'Completed'\n);",
      "hints": [
        "Require at least one order so customers with no orders are excluded.",
        "Then verify that no non-Completed order exists.",
        "Combine EXISTS with NOT EXISTS."
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
      "num": 32,
      "difficulty": "Interview Style",
      "text": "Identify customers who have at least one Cancelled order and at least one Completed order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'Cancelled'\n)\nAND EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'Completed'\n);",
      "hints": [
        "Two different order-status conditions must both be true.",
        "Check separately for Cancelled and Completed orders.",
        "Combine two correlated EXISTS conditions with AND."
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
      "num": 33,
      "difficulty": "Interview Style",
      "text": "Identify products that have been purchased exactly once.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nGROUP BY p.product_id, p.product_name\nHAVING COUNT(oi.order_item_id) = 1;",
      "hints": [
        "Join products to their matching purchase rows.",
        "Count order-item records for each product.",
        "Use HAVING COUNT(oi.order_item_id) = 1."
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
            "\\border_items?\\b"
          ],
          [
            "\\b(count|sum)\\s*\\("
          ],
          [
            "\\b(having|where)\\b"
          ],
          [
            "(=\\s*1\\b|\\bexactly\\s+once\\b)"
          ]
        ]
      }
    },
    {
      "num": 34,
      "difficulty": "Interview Style",
      "text": "Identify products purchased by multiple customers.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  COUNT(DISTINCT o.customer_id) AS customer_count\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nINNER JOIN orders AS o\n  ON o.order_id = oi.order_id\nGROUP BY p.product_id, p.product_name\nHAVING COUNT(DISTINCT o.customer_id) > 1;",
      "hints": [
        "Connect products to the customers who ordered them.",
        "Count distinct customer IDs per product.",
        "Use HAVING COUNT(DISTINCT o.customer_id) > 1."
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
      "num": 35,
      "difficulty": "Interview Style",
      "text": "Identify customers who have purchased the same product multiple times.",
      "sql": "SELECT DISTINCT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY c.customer_id, c.customer_name, oi.product_id\nHAVING COUNT(oi.order_item_id) > 1;",
      "hints": [
        "The repetition must be measured for each customer-product pair.",
        "Group by the customer and product.",
        "Use HAVING COUNT(oi.order_item_id) > 1, then return distinct customers."
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
        "orderSensitive": false,
        "emptyResultSqlGroups": [
          [
            "\\bcustomers?\\b"
          ],
          [
            "\\borders?\\b"
          ],
          [
            "\\border_items?\\b"
          ],
          [
            "\\b(count|sum)\\s*\\("
          ],
          [
            "(>\\s*1\\b|>=\\s*2\\b)"
          ]
        ]
      }
    },
    {
      "num": 36,
      "difficulty": "Interview Style",
      "text": "Identify customers who have purchased products from multiple categories.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  COUNT(DISTINCT p.category) AS category_count\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id\nGROUP BY c.customer_id, c.customer_name\nHAVING COUNT(DISTINCT p.category) > 1;",
      "hints": [
        "Trace customers to the categories of purchased products.",
        "Count distinct categories for each customer.",
        "Use HAVING COUNT(DISTINCT p.category) > 1."
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
      "num": 37,
      "difficulty": "Interview Style",
      "text": "Identify customers who have placed orders but have no Completed orders.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM customers AS c\nWHERE EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.status = 'Completed'\n);",
      "hints": [
        "The customer must have at least one order.",
        "At the same time, no Completed order may exist.",
        "Combine EXISTS with NOT EXISTS."
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
        "orderSensitive": false,
        "emptyResultSqlGroups": [
          [
            "\\bcustomers?\\b"
          ],
          [
            "\\borders?\\b"
          ],
          [
            "\\bcompleted\\b"
          ],
          [
            "\\b(not\\s+exists|having|case|except)\\b"
          ]
        ]
      }
    },
    {
      "num": 38,
      "difficulty": "Interview Style",
      "text": "Find the top customer by revenue using joins and aggregation.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY c.customer_id, c.customer_name\nORDER BY total_revenue DESC\nLIMIT 1;",
      "hints": [
        "Connect customers to all purchased order items.",
        "Calculate total revenue for each customer.",
        "Sort revenue descending and keep the first row."
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
      "num": 39,
      "difficulty": "Interview Style",
      "text": "Find the top product by revenue using joins and aggregation.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nGROUP BY p.product_id, p.product_name\nORDER BY total_revenue DESC\nLIMIT 1;",
      "hints": [
        "Connect products to their sales rows.",
        "Calculate total revenue for each product.",
        "Sort revenue descending and keep the first row."
      ],
      "orderSensitive": true,
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
        "orderSensitive": true
      }
    },
    {
      "num": 40,
      "difficulty": "Interview Style",
      "text": "Explain why joining orders to order_items can increase the number of rows returned.",
      "sql": "SELECT\n  'A single order can match multiple order_items. The join returns one row for each matching order-item pair, so an order is repeated once for every item it contains.' AS explanation;",
      "hints": [
        "Think about the relationship between one order and its line items.",
        "One order can contain several order_items.",
        "For this conceptual exercise, return your explanation as a quoted text value in a SELECT statement."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "conceptual-demo",
        "requiredColumns": [
          "explanation"
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
