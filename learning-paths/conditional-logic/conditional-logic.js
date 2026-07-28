window.SQL_MASTERY_MODULE = {
  "id": "conditional-logic",
  "title": "conditional logic",
  "learningPath": 3,
  "questionCount": 25,
  "database": "../../databases/ecommerce.sqlite",
  "storageKey": "sqlMasteryConditionalLogicV2",
  "patternGoal": {
    "recognize": [
      "if",
      "when",
      "classify",
      "label",
      "flag",
      "status",
      "poor",
      "good",
      "high",
      "low",
      "missing"
    ],
    "think": [
      "CASE WHEN",
      "COALESCE",
      "NULLIF",
      "Conditional Aggregation"
    ]
  },
  "frameworkPrompts": [
    "What should one output row represent?",
    "Which condition or business rule must be tested?",
    "What label or value should each condition return?",
    "Does the order of the WHEN clauses matter?",
    "What should happen when no condition matches?",
    "Should NULL values be replaced with COALESCE?",
    "Is conditional aggregation required?",
    "Could division by zero require NULLIF?"
  ],
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Classify each product as Expensive if the price is at least 300; otherwise classify it as Affordable.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  price,\n  CASE\n    WHEN price >= 300 THEN 'Expensive'\n    ELSE 'Affordable'\n  END AS price_classification\nFROM products;",
      "hints": [
        "Return one row for every product.",
        "Use a CASE expression based on the price column.",
        "Test price >= 300 before using ELSE for the remaining products."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "product_id",
          "price_classification"
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
      "text": "Classify each customer as Canada if they are from Canada; otherwise classify them as International.",
      "sql": "SELECT\n  customer_id,\n  customer_name,\n  country,\n  CASE\n    WHEN country = 'Canada' THEN 'Canada'\n    ELSE 'International'\n  END AS customer_market\nFROM customers;",
      "hints": [
        "Return one row for every customer.",
        "Compare the country column with 'Canada'.",
        "Use ELSE to label every other country as International."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
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
      "text": "Label each order as Finalized if its status is Completed; otherwise label it as Not Finalized.",
      "sql": "SELECT\n  order_id,\n  customer_id,\n  order_date,\n  status,\n  CASE\n    WHEN status = 'Completed' THEN 'Finalized'\n    ELSE 'Not Finalized'\n  END AS order_label\nFROM orders;",
      "hints": [
        "Keep each order in the result.",
        "Use the status column inside CASE WHEN.",
        "Only Completed orders should receive the Finalized label."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "order_id",
          "order_label"
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
      "num": 4,
      "difficulty": "Beginner",
      "text": "Categorize each product as Low Price, Medium Price, or High Price: below 100 is Low Price, 100–299.99 is Medium Price, and at least 300 is High Price.",
      "sql": "SELECT\n  product_id,\n  product_name,\n  price,\n  CASE\n    WHEN price < 100 THEN 'Low Price'\n    WHEN price < 300 THEN 'Medium Price'\n    ELSE 'High Price'\n  END AS price_level\nFROM products;",
      "hints": [
        "Use a searched CASE expression with more than one WHEN.",
        "Check the lowest price range first.",
        "After price < 100 is handled, price < 300 represents the middle range."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "product_id",
          "price_level"
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
      "text": "Label each customer as Local if they are from Montreal; otherwise label them as Other.",
      "sql": "SELECT\n  customer_id,\n  customer_name,\n  city,\n  CASE\n    WHEN city = 'Montreal' THEN 'Local'\n    ELSE 'Other'\n  END AS location_label\nFROM customers;",
      "hints": [
        "Return one row for each customer.",
        "Compare the city column with 'Montreal'.",
        "Use ELSE for all customers from other cities."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id",
          "location_label"
        ],
        "optionalColumns": [
          "customer_name",
          "city"
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
      "text": "Calculate the number of Expensive and Affordable products.",
      "sql": "SELECT\n  CASE\n    WHEN price >= 300 THEN 'Expensive'\n    ELSE 'Affordable'\n  END AS price_classification,\n  COUNT(*) AS product_count\nFROM products\nGROUP BY\n  CASE\n    WHEN price >= 300 THEN 'Expensive'\n    ELSE 'Affordable'\n  END;",
      "hints": [
        "First create the price classification with CASE.",
        "Count products within each resulting label.",
        "Group by the same CASE expression used in SELECT."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "price_classification",
          "product_count"
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
      "text": "Calculate the number of Canadian and International customers.",
      "sql": "SELECT\n  CASE\n    WHEN country = 'Canada' THEN 'Canadian'\n    ELSE 'International'\n  END AS customer_group,\n  COUNT(*) AS customer_count\nFROM customers\nGROUP BY\n  CASE\n    WHEN country = 'Canada' THEN 'Canadian'\n    ELSE 'International'\n  END;",
      "hints": [
        "Create two groups based on country.",
        "Count the rows in each group.",
        "Repeat the CASE expression in GROUP BY."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "customer_group",
          "customer_count"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 8,
      "difficulty": "Easy",
      "text": "Calculate the number of Finalized and Not Finalized orders.",
      "sql": "SELECT\n  CASE\n    WHEN status = 'Completed' THEN 'Finalized'\n    ELSE 'Not Finalized'\n  END AS order_group,\n  COUNT(*) AS order_count\nFROM orders\nGROUP BY\n  CASE\n    WHEN status = 'Completed' THEN 'Finalized'\n    ELSE 'Not Finalized'\n  END;",
      "hints": [
        "Classify Completed orders separately from all other statuses.",
        "Use COUNT(*) to count each classification.",
        "Group by the CASE expression."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "order_group",
          "order_count"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 9,
      "difficulty": "Easy",
      "text": "Calculate total revenue generated from Expensive products.",
      "sql": "SELECT\n  ROUND(SUM(\n    CASE\n      WHEN p.price >= 300 THEN oi.quantity * oi.unit_price\n      ELSE 0\n    END\n  ), 2) AS expensive_product_revenue\nFROM order_items AS oi\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id;",
      "hints": [
        "Revenue is quantity multiplied by unit price.",
        "Join order_items to products so you can test the product price.",
        "Place the CASE expression inside SUM and return zero for non-expensive products."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "expensive_product_revenue"
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
      "text": "Calculate total revenue generated from Affordable products.",
      "sql": "SELECT\n  ROUND(SUM(\n    CASE\n      WHEN p.price < 300 THEN oi.quantity * oi.unit_price\n      ELSE 0\n    END\n  ), 2) AS affordable_product_revenue\nFROM order_items AS oi\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id;",
      "hints": [
        "Use the same revenue formula as before.",
        "Affordable products have a price below 300.",
        "Use conditional aggregation with SUM(CASE WHEN ...)."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "affordable_product_revenue"
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
      "text": "Calculate the percentage of products classified as Expensive.",
      "sql": "SELECT\n  ROUND(\n    100.0 * SUM(CASE WHEN price >= 300 THEN 1 ELSE 0 END) / COUNT(*),\n    2\n  ) AS expensive_product_percentage\nFROM products;",
      "hints": [
        "The numerator is the number of products priced at least 300.",
        "The denominator is the total number of products.",
        "Use 100.0 to force decimal division."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "expensive_product_percentage"
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
      "difficulty": "Intermediate",
      "text": "Calculate the percentage of customers from Canada.",
      "sql": "SELECT\n  ROUND(\n    100.0 * SUM(CASE WHEN country = 'Canada' THEN 1 ELSE 0 END) / COUNT(*),\n    2\n  ) AS canadian_customer_percentage\nFROM customers;",
      "hints": [
        "Count Canadian customers conditionally.",
        "Divide by the total number of customers.",
        "Multiply by 100.0 and round the result."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "canadian_customer_percentage"
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
      "difficulty": "Intermediate",
      "text": "Calculate the percentage of Completed orders.",
      "sql": "SELECT\n  ROUND(\n    100.0 * SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) / COUNT(*),\n    2\n  ) AS completed_order_percentage\nFROM orders;",
      "hints": [
        "Use a conditional count for Completed orders.",
        "COUNT(*) gives the total number of orders.",
        "Convert the ratio to a percentage."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "completed_order_percentage"
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
      "text": "Calculate the revenue split between Electronics and Non-Electronics products.",
      "sql": "SELECT\n  CASE\n    WHEN p.category = 'Electronics' THEN 'Electronics'\n    ELSE 'Non-Electronics'\n  END AS category_group,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue\nFROM order_items AS oi\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id\nGROUP BY\n  CASE\n    WHEN p.category = 'Electronics' THEN 'Electronics'\n    ELSE 'Non-Electronics'\n  END;",
      "hints": [
        "Join order_items to products to access category.",
        "Use CASE to create exactly two category groups.",
        "Group by the CASE result and sum revenue."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "category_group",
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
      "num": 15,
      "difficulty": "Intermediate",
      "text": "Calculate the quantity sold by product price level using Low Price below 100, Medium Price from 100 to below 300, and High Price at least 300.",
      "sql": "SELECT\n  CASE\n    WHEN p.price < 100 THEN 'Low Price'\n    WHEN p.price < 300 THEN 'Medium Price'\n    ELSE 'High Price'\n  END AS price_level,\n  SUM(oi.quantity) AS total_quantity_sold\nFROM order_items AS oi\nINNER JOIN products AS p\n  ON p.product_id = oi.product_id\nGROUP BY\n  CASE\n    WHEN p.price < 100 THEN 'Low Price'\n    WHEN p.price < 300 THEN 'Medium Price'\n    ELSE 'High Price'\n  END;",
      "hints": [
        "Use the three price ranges from Question 4.",
        "Join products to order_items before summing quantity.",
        "Group by the same CASE expression."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "price_level",
          "total_quantity_sold"
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
      "difficulty": "Advanced",
      "text": "Calculate total revenue for each customer and classify them as High Value when revenue is at least 1000, Medium Value when revenue is at least 300, and Low Value otherwise.",
      "sql": "WITH customer_revenue AS (\n  SELECT\n    c.customer_id,\n    c.customer_name,\n    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_revenue\n  FROM customers AS c\n  LEFT JOIN orders AS o\n    ON o.customer_id = c.customer_id\n  LEFT JOIN order_items AS oi\n    ON oi.order_id = o.order_id\n  GROUP BY c.customer_id, c.customer_name\n)\nSELECT\n  customer_id,\n  customer_name,\n  ROUND(total_revenue, 2) AS total_revenue,\n  CASE\n    WHEN total_revenue >= 1000 THEN 'High Value'\n    WHEN total_revenue >= 300 THEN 'Medium Value'\n    ELSE 'Low Value'\n  END AS customer_segment\nFROM customer_revenue;",
      "hints": [
        "Calculate customer revenue before applying the classification.",
        "Use LEFT JOIN and COALESCE so customers without orders receive zero revenue.",
        "Test the highest threshold first inside CASE."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id",
          "total_revenue",
          "customer_segment"
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
      "text": "Calculate total quantity sold for each product and classify it as Best Seller when total quantity sold is at least 5; otherwise classify it as Normal.",
      "sql": "WITH product_sales AS (\n  SELECT\n    p.product_id,\n    p.product_name,\n    COALESCE(SUM(oi.quantity), 0) AS total_quantity_sold\n  FROM products AS p\n  LEFT JOIN order_items AS oi\n    ON oi.product_id = p.product_id\n  GROUP BY p.product_id, p.product_name\n)\nSELECT\n  product_id,\n  product_name,\n  total_quantity_sold,\n  CASE\n    WHEN total_quantity_sold >= 5 THEN 'Best Seller'\n    ELSE 'Normal'\n  END AS sales_classification\nFROM product_sales;",
      "hints": [
        "First aggregate quantity by product.",
        "Preserve products with no order items by using LEFT JOIN.",
        "Apply CASE to the calculated total quantity."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "product_id",
          "total_quantity_sold",
          "sales_classification"
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
      "num": 18,
      "difficulty": "Advanced",
      "text": "Calculate total revenue for each product category and classify it as High Revenue when its revenue is at or above the average category revenue; otherwise classify it as Low Revenue.",
      "sql": "WITH category_revenue AS (\n  SELECT\n    p.category,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\n  FROM products AS p\n  INNER JOIN order_items AS oi\n    ON oi.product_id = p.product_id\n  GROUP BY p.category\n),\naverage_revenue AS (\n  SELECT AVG(total_revenue) AS average_category_revenue\n  FROM category_revenue\n)\nSELECT\n  cr.category,\n  ROUND(cr.total_revenue, 2) AS total_revenue,\n  CASE\n    WHEN cr.total_revenue >= ar.average_category_revenue THEN 'High Revenue'\n    ELSE 'Low Revenue'\n  END AS revenue_classification\nFROM category_revenue AS cr\nCROSS JOIN average_revenue AS ar;",
      "hints": [
        "First calculate one revenue total per category.",
        "Then calculate the average of those category totals.",
        "Compare each category total with the average inside CASE."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "category",
          "total_revenue",
          "revenue_classification"
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
      "text": "Calculate the Completed order rate for each country.",
      "sql": "SELECT\n  c.country,\n  COUNT(o.order_id) AS total_orders,\n  SUM(CASE WHEN o.status = 'Completed' THEN 1 ELSE 0 END) AS completed_orders,\n  ROUND(\n    100.0 * SUM(CASE WHEN o.status = 'Completed' THEN 1 ELSE 0 END)\n    / NULLIF(COUNT(o.order_id), 0),\n    2\n  ) AS completed_order_rate\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\nGROUP BY c.country;",
      "hints": [
        "Join customers to orders so each order can be associated with a country.",
        "Use conditional aggregation for Completed orders.",
        "Use NULLIF around the denominator to prevent division by zero."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "country",
          "total_orders",
          "completed_orders",
          "completed_order_rate"
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
      "difficulty": "Advanced",
      "text": "Create an order status summary for each customer showing Has Cancelled Order or No Cancelled Order.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  CASE\n    WHEN SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) > 0\n      THEN 'Has Cancelled Order'\n    ELSE 'No Cancelled Order'\n  END AS cancellation_summary\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\nGROUP BY c.customer_id, c.customer_name;",
      "hints": [
        "All customers should appear, including those without orders.",
        "Count Cancelled orders conditionally within each customer group.",
        "Use an outer CASE to test whether that conditional count is greater than zero."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "customer_id",
          "cancellation_summary"
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
      "num": 21,
      "difficulty": "Interview Style",
      "text": "Calculate the overall cancellation rate using conditional aggregation.",
      "sql": "SELECT\n  COUNT(*) AS total_orders,\n  SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,\n  ROUND(\n    100.0 * SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*),\n    2\n  ) AS cancellation_rate\nFROM orders;",
      "hints": [
        "Use one aggregate query over the orders table.",
        "The numerator counts only Cancelled orders.",
        "Divide the conditional count by the total order count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "total_orders",
          "cancelled_orders",
          "cancellation_rate"
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
      "difficulty": "Interview Style",
      "text": "Calculate the Completed order rate by country using conditional aggregation.",
      "sql": "SELECT\n  c.country,\n  COUNT(o.order_id) AS total_orders,\n  SUM(CASE WHEN o.status = 'Completed' THEN 1 ELSE 0 END) AS completed_orders,\n  ROUND(\n    100.0 * SUM(CASE WHEN o.status = 'Completed' THEN 1 ELSE 0 END)\n    / NULLIF(COUNT(o.order_id), 0),\n    2\n  ) AS completed_order_rate\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON o.customer_id = c.customer_id\nGROUP BY c.country;",
      "hints": [
        "Country comes from customers, while status comes from orders.",
        "Use SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END).",
        "Group by country and protect the denominator with NULLIF."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "country",
          "total_orders",
          "completed_orders",
          "completed_order_rate"
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
      "difficulty": "Interview Style",
      "text": "Calculate revenue generated from Completed orders only.",
      "sql": "SELECT\n  ROUND(SUM(\n    CASE\n      WHEN o.status = 'Completed' THEN oi.quantity * oi.unit_price\n      ELSE 0\n    END\n  ), 2) AS completed_order_revenue\nFROM orders AS o\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id;",
      "hints": [
        "Join orders to order_items to access both status and line-item revenue.",
        "Revenue is quantity multiplied by unit price.",
        "Use CASE inside SUM so only Completed orders contribute revenue."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "completed_order_revenue"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 24,
      "difficulty": "Interview Style",
      "text": "Identify customers whose Completed order revenue is greater than their Cancelled order revenue.",
      "sql": "SELECT\n  c.customer_id,\n  c.customer_name,\n  ROUND(SUM(\n    CASE\n      WHEN o.status = 'Completed' THEN oi.quantity * oi.unit_price\n      ELSE 0\n    END\n  ), 2) AS completed_revenue,\n  ROUND(SUM(\n    CASE\n      WHEN o.status = 'Cancelled' THEN oi.quantity * oi.unit_price\n      ELSE 0\n    END\n  ), 2) AS cancelled_revenue\nFROM customers AS c\nINNER JOIN orders AS o\n  ON o.customer_id = c.customer_id\nINNER JOIN order_items AS oi\n  ON oi.order_id = o.order_id\nGROUP BY c.customer_id, c.customer_name\nHAVING\n  SUM(CASE WHEN o.status = 'Completed' THEN oi.quantity * oi.unit_price ELSE 0 END)\n  >\n  SUM(CASE WHEN o.status = 'Cancelled' THEN oi.quantity * oi.unit_price ELSE 0 END);",
      "hints": [
        "Calculate two conditional revenue totals for each customer.",
        "Group by customer before comparing the totals.",
        "Use HAVING to compare Completed revenue with Cancelled revenue."
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
      "difficulty": "Interview Style",
      "text": "Identify products where more than 50% of the quantity sold came from Completed orders.",
      "sql": "SELECT\n  p.product_id,\n  p.product_name,\n  SUM(oi.quantity) AS total_quantity_sold,\n  SUM(CASE WHEN o.status = 'Completed' THEN oi.quantity ELSE 0 END) AS completed_quantity,\n  ROUND(\n    100.0 * SUM(CASE WHEN o.status = 'Completed' THEN oi.quantity ELSE 0 END)\n    / NULLIF(SUM(oi.quantity), 0),\n    2\n  ) AS completed_quantity_percentage\nFROM products AS p\nINNER JOIN order_items AS oi\n  ON oi.product_id = p.product_id\nINNER JOIN orders AS o\n  ON o.order_id = oi.order_id\nGROUP BY p.product_id, p.product_name\nHAVING\n  1.0 * SUM(CASE WHEN o.status = 'Completed' THEN oi.quantity ELSE 0 END)\n  / NULLIF(SUM(oi.quantity), 0) > 0.5;",
      "hints": [
        "For each product, calculate both total quantity and Completed-order quantity.",
        "Join products, order_items, and orders.",
        "Use HAVING to keep products whose Completed quantity ratio is greater than 0.5."
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
