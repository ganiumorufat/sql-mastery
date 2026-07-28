window.SQL_MASTERY_MODULE = {
  "id": "aggregation",
  "title": "aggregation",
  "learningPath": 1,
  "questionCount": 50,
  "database": "../../databases/aggregation.sqlite",
  "storageKey": "sqlMasteryAggregationV2",
  "questions": [
    {
      "num": 1,
      "difficulty": "Beginner",
      "text": "Count the total number of customers.",
      "sql": "SELECT COUNT(*) AS total_customers FROM customers;",
      "hints": [
        "Use the customers table.",
        "COUNT(*) counts every row.",
        "Return one aggregate value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "total_customers"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 2,
      "difficulty": "Beginner",
      "text": "Count the total number of products.",
      "sql": "SELECT COUNT(*) AS total_products FROM products;",
      "hints": [
        "Use the products table.",
        "COUNT(*) counts all product rows.",
        "Return one row."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "total_products"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 3,
      "difficulty": "Beginner",
      "text": "Count the total number of orders.",
      "sql": "SELECT COUNT(*) AS total_orders FROM orders;",
      "hints": [
        "Use the orders table.",
        "COUNT(*) counts all orders.",
        "No GROUP BY is needed."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "total_orders"
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
      "text": "Find the average product price.",
      "sql": "SELECT ROUND(AVG(price), 2) AS average_product_price FROM products;",
      "hints": [
        "Use AVG on the price column.",
        "The table is products.",
        "ROUND can make the result easier to read."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "average_product_price"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 5,
      "difficulty": "Beginner",
      "text": "Find the highest product price.",
      "sql": "SELECT MAX(price) AS highest_product_price FROM products;",
      "hints": [
        "Use MAX.",
        "The value comes from products.price.",
        "Return one value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "highest_product_price"
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
      "difficulty": "Beginner",
      "text": "Find the lowest product price.",
      "sql": "SELECT MIN(price) AS lowest_product_price FROM products;",
      "hints": [
        "Use MIN.",
        "The value comes from products.price.",
        "Return one value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "lowest_product_price"
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
      "difficulty": "Beginner",
      "text": "Find the total quantity sold.",
      "sql": "SELECT SUM(quantity) AS total_quantity_sold FROM order_items;",
      "hints": [
        "Quantity is stored in order_items.",
        "Use SUM(quantity).",
        "No join is required."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
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
      "num": 8,
      "difficulty": "Beginner",
      "text": "Find the total revenue from order_items.",
      "sql": "SELECT ROUND(SUM(quantity * unit_price), 2) AS total_revenue FROM order_items;",
      "hints": [
        "Revenue per line is quantity × unit_price.",
        "Sum all line revenue.",
        "Use ROUND if needed."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
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
      "num": 9,
      "difficulty": "Beginner",
      "text": "Count how many unique countries customers come from.",
      "sql": "SELECT COUNT(DISTINCT country) AS unique_countries FROM customers;",
      "hints": [
        "Use COUNT DISTINCT.",
        "The column is customers.country.",
        "Return one value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "unique_countries"
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
      "difficulty": "Beginner",
      "text": "Count how many unique product categories exist.",
      "sql": "SELECT COUNT(DISTINCT category) AS unique_categories FROM products;",
      "hints": [
        "Use COUNT DISTINCT.",
        "The category column is in products.",
        "Return one value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "unique_categories"
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
      "difficulty": "Easy",
      "text": "Count customers per country.",
      "sql": "SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country;",
      "hints": [
        "The word per signals GROUP BY.",
        "Group by country.",
        "Count rows inside each country."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "country",
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
      "num": 12,
      "difficulty": "Easy",
      "text": "Count customers per city.",
      "sql": "SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city;",
      "hints": [
        "Group by city.",
        "Use COUNT(*) for each group.",
        "Return city and count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "city",
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
      "num": 13,
      "difficulty": "Easy",
      "text": "Count products per category.",
      "sql": "SELECT category, COUNT(*) AS product_count FROM products GROUP BY category;",
      "hints": [
        "Group products by category.",
        "Count each category's rows.",
        "Return category and count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "category",
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
      "num": 14,
      "difficulty": "Easy",
      "text": "Count orders by status.",
      "sql": "SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status;",
      "hints": [
        "Group by status.",
        "Count orders in each status.",
        "Return status and count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "status",
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
      "num": 15,
      "difficulty": "Easy",
      "text": "Find average product price per category.",
      "sql": "SELECT category, ROUND(AVG(price), 2) AS average_price FROM products GROUP BY category;",
      "hints": [
        "Use AVG(price).",
        "Group by category.",
        "Return one row per category."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
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
      "num": 16,
      "difficulty": "Easy",
      "text": "Find total quantity sold per order.",
      "sql": "SELECT order_id, SUM(quantity) AS total_quantity FROM order_items GROUP BY order_id;",
      "hints": [
        "Group order_items by order_id.",
        "Sum quantity in each order.",
        "Return order_id and total."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
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
      "num": 17,
      "difficulty": "Easy",
      "text": "Find total revenue per order.",
      "sql": "SELECT order_id, ROUND(SUM(quantity * unit_price), 2) AS total_revenue FROM order_items GROUP BY order_id;",
      "hints": [
        "Calculate line revenue.",
        "Group by order_id.",
        "Sum within each order."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
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
      "num": 18,
      "difficulty": "Easy",
      "text": "Find total quantity sold per product.",
      "sql": "SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id;",
      "hints": [
        "Group by product_id.",
        "Sum quantity.",
        "A join is unnecessary unless names are requested."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "product_id"
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
      "difficulty": "Easy",
      "text": "Find total revenue per product.",
      "sql": "SELECT product_id, ROUND(SUM(quantity * unit_price), 2) AS total_revenue FROM order_items GROUP BY product_id;",
      "hints": [
        "Group by product_id.",
        "Revenue is quantity × unit_price.",
        "Sum each product's revenue."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "product_id"
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
      "difficulty": "Easy",
      "text": "Find total revenue per product category.",
      "sql": "SELECT p.category, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM order_items oi JOIN products p ON p.product_id = oi.product_id GROUP BY p.category;",
      "hints": [
        "Category is in products.",
        "Revenue is in order_items.",
        "Join on product_id and group by category."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
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
      "num": 21,
      "difficulty": "Intermediate",
      "text": "Find countries with more than 19 customers.",
      "sql": "SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country HAVING COUNT(*) > 19;",
      "hints": [
        "Filter groups with HAVING.",
        "Group by country first.",
        "Use COUNT(*) > 19."
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
      "num": 22,
      "difficulty": "Intermediate",
      "text": "Find cities with more than 6 customers.",
      "sql": "SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city HAVING COUNT(*) > 6;",
      "hints": [
        "Use GROUP BY city.",
        "Use HAVING for an aggregate filter.",
        "Keep counts above 6."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "city"
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
      "difficulty": "Intermediate",
      "text": "Find categories with average price greater than 350.",
      "sql": "SELECT category, ROUND(AVG(price), 2) AS average_price FROM products GROUP BY category HAVING AVG(price) > 350;",
      "hints": [
        "Group by category.",
        "Calculate AVG(price).",
        "Filter with HAVING."
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
      "num": 24,
      "difficulty": "Intermediate",
      "text": "Find orders with total revenue greater than 10,000.",
      "sql": "SELECT order_id, ROUND(SUM(quantity * unit_price), 2) AS total_revenue FROM order_items GROUP BY order_id HAVING SUM(quantity * unit_price) > 10000;",
      "hints": [
        "Group by order_id.",
        "Calculate revenue per order.",
        "Use HAVING for the threshold."
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
      "num": 25,
      "difficulty": "Intermediate",
      "text": "Find products that sold more than 134 units.",
      "sql": "SELECT product_id, SUM(quantity) AS total_units FROM order_items GROUP BY product_id HAVING SUM(quantity) > 134;",
      "hints": [
        "Group by product_id.",
        "Sum quantity.",
        "Filter groups with HAVING."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "product_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 26,
      "difficulty": "Intermediate",
      "text": "Find customers who placed more than 6 orders.",
      "sql": "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 6;",
      "hints": [
        "Orders contains customer_id.",
        "Group by customer_id.",
        "Use HAVING COUNT(*) > 6."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 27,
      "difficulty": "Intermediate",
      "text": "Find the percentage of orders that are Completed.",
      "sql": "SELECT ROUND(100.0 * SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) / COUNT(*), 2) AS completed_percentage FROM orders;",
      "hints": [
        "Count Completed orders conditionally.",
        "Divide by all orders.",
        "Use 100.0 to avoid integer division."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "completed_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 28,
      "difficulty": "Intermediate",
      "text": "Find the percentage of orders that are Cancelled.",
      "sql": "SELECT ROUND(100.0 * SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancelled_percentage FROM orders;",
      "hints": [
        "Use a CASE expression.",
        "Divide cancelled count by total count.",
        "Multiply by 100.0."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "cancelled_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 29,
      "difficulty": "Intermediate",
      "text": "Find the percentage of customers from Canada.",
      "sql": "SELECT ROUND(100.0 * SUM(CASE WHEN country = 'Canada' THEN 1 ELSE 0 END) / COUNT(*), 2) AS canada_customer_percentage FROM customers;",
      "hints": [
        "Conditionally count Canadian customers.",
        "Divide by all customers.",
        "Use 100.0 for a percentage."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "canada_customer_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 30,
      "difficulty": "Intermediate",
      "text": "Find each category’s percentage share of total revenue.",
      "sql": "SELECT p.category, ROUND(100.0 * SUM(oi.quantity * oi.unit_price) / (SELECT SUM(quantity * unit_price) FROM order_items), 2) AS revenue_share_percentage FROM order_items oi JOIN products p ON p.product_id = oi.product_id GROUP BY p.category;",
      "hints": [
        "Calculate category revenue.",
        "Divide by total revenue.",
        "Use a scalar subquery for the denominator."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "category",
          "revenue_share_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 31,
      "difficulty": "Advanced",
      "text": "Find average revenue per customer.",
      "sql": "SELECT ROUND(SUM(oi.quantity * oi.unit_price) / COUNT(DISTINCT o.customer_id), 2) AS average_revenue_per_customer FROM orders o JOIN order_items oi ON oi.order_id = o.order_id;",
      "hints": [
        "Find total revenue.",
        "Count distinct customers represented in orders.",
        "Divide revenue by customer count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "average_revenue_per_customer"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 32,
      "difficulty": "Advanced",
      "text": "Find average order value.",
      "sql": "SELECT ROUND(SUM(quantity * unit_price) / COUNT(DISTINCT order_id), 2) AS average_order_value FROM order_items;",
      "hints": [
        "Find total revenue.",
        "Count distinct orders.",
        "Divide total revenue by order count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "average_order_value"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 33,
      "difficulty": "Advanced",
      "text": "Find average quantity per order.",
      "sql": "SELECT ROUND(1.0 * SUM(quantity) / COUNT(DISTINCT order_id), 2) AS average_quantity_per_order FROM order_items;",
      "hints": [
        "Sum all quantities.",
        "Count distinct orders.",
        "Divide using a decimal value."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "average_quantity_per_order"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 34,
      "difficulty": "Advanced",
      "text": "Find the customer with the highest total revenue.",
      "sql": "SELECT c.customer_id, c.customer_name, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM customers c JOIN orders o ON o.customer_id = c.customer_id JOIN order_items oi ON oi.order_id = o.order_id GROUP BY c.customer_id, c.customer_name ORDER BY total_revenue DESC LIMIT 1;",
      "hints": [
        "Join customers to their purchases.",
        "Group by customer.",
        "Sort descending and keep one row."
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
      "num": 35,
      "difficulty": "Advanced",
      "text": "Find the product with the highest total revenue.",
      "sql": "SELECT p.product_id, p.product_name, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM products p JOIN order_items oi ON oi.product_id = p.product_id GROUP BY p.product_id, p.product_name ORDER BY total_revenue DESC LIMIT 1;",
      "hints": [
        "Join products to order_items.",
        "Group by product.",
        "Sort revenue descending."
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
      "num": 36,
      "difficulty": "Advanced",
      "text": "Find the category with the highest total revenue.",
      "sql": "SELECT p.category, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM products p JOIN order_items oi ON oi.product_id = p.product_id GROUP BY p.category ORDER BY total_revenue DESC LIMIT 1;",
      "hints": [
        "Group revenue by category.",
        "Sort descending.",
        "Keep the first row."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "category"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 37,
      "difficulty": "Advanced",
      "text": "Find the country with the highest total revenue.",
      "sql": "SELECT c.country, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_revenue FROM customers c JOIN orders o ON o.customer_id = c.customer_id JOIN order_items oi ON oi.order_id = o.order_id GROUP BY c.country ORDER BY total_revenue DESC LIMIT 1;",
      "hints": [
        "Connect country to order items.",
        "Group by country.",
        "Sort and limit to one."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "country"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 38,
      "difficulty": "Advanced",
      "text": "Find revenue from Completed orders only.",
      "sql": "SELECT ROUND(SUM(oi.quantity * oi.unit_price), 2) AS completed_revenue FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'Completed';",
      "hints": [
        "Join orders and order_items.",
        "Filter status before aggregating.",
        "Sum line revenue."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "single-metric",
        "requiredColumns": [
          "completed_revenue"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 39,
      "difficulty": "Advanced",
      "text": "Find percentage of revenue from Electronics.",
      "sql": "SELECT ROUND(100.0 * SUM(CASE WHEN p.category = 'Electronics' THEN oi.quantity * oi.unit_price ELSE 0 END) / SUM(oi.quantity * oi.unit_price), 2) AS electronics_revenue_percentage FROM order_items oi JOIN products p ON p.product_id = oi.product_id;",
      "hints": [
        "Calculate Electronics revenue conditionally.",
        "Divide by all revenue.",
        "Multiply by 100.0."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "electronics_revenue_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 40,
      "difficulty": "Advanced",
      "text": "Find percentage of customers who placed at least one order.",
      "sql": "SELECT ROUND(100.0 * COUNT(DISTINCT o.customer_id) / (SELECT COUNT(*) FROM customers), 2) AS customer_order_percentage FROM orders o;",
      "hints": [
        "Count distinct customers in orders.",
        "Divide by all customers.",
        "Use a subquery for the total customer count."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "customer_order_percentage"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 41,
      "difficulty": "Interview Style",
      "text": "Which customers have revenue above the average customer revenue?",
      "sql": "WITH customer_revenue AS (SELECT c.customer_id, c.customer_name, SUM(oi.quantity * oi.unit_price) AS revenue FROM customers c JOIN orders o ON o.customer_id = c.customer_id JOIN order_items oi ON oi.order_id = o.order_id GROUP BY c.customer_id, c.customer_name) SELECT customer_id, customer_name, ROUND(revenue, 2) AS revenue FROM customer_revenue WHERE revenue > (SELECT AVG(revenue) FROM customer_revenue);",
      "hints": [
        "Calculate revenue at customer grain.",
        "Calculate the average of those customer totals.",
        "Keep customers above that average."
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
      "num": 42,
      "difficulty": "Interview Style",
      "text": "Which products generated revenue above the average product revenue?",
      "sql": "WITH product_revenue AS (SELECT p.product_id, p.product_name, SUM(oi.quantity * oi.unit_price) AS revenue FROM products p JOIN order_items oi ON oi.product_id = p.product_id GROUP BY p.product_id, p.product_name) SELECT product_id, product_name, ROUND(revenue, 2) AS revenue FROM product_revenue WHERE revenue > (SELECT AVG(revenue) FROM product_revenue);",
      "hints": [
        "Aggregate first by product.",
        "Average the product totals.",
        "Filter above the average."
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
      "num": 43,
      "difficulty": "Interview Style",
      "text": "Which category contributes the largest share of revenue?",
      "sql": "SELECT p.category, ROUND(100.0 * SUM(oi.quantity * oi.unit_price) / (SELECT SUM(quantity * unit_price) FROM order_items), 2) AS revenue_share_percentage FROM products p JOIN order_items oi ON oi.product_id = p.product_id GROUP BY p.category ORDER BY revenue_share_percentage DESC LIMIT 1;",
      "hints": [
        "Calculate percentage share per category.",
        "Order descending.",
        "Keep the top category."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "category"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 44,
      "difficulty": "Interview Style",
      "text": "Which order has the highest number of items?",
      "sql": "SELECT order_id, SUM(quantity) AS item_count FROM order_items GROUP BY order_id ORDER BY item_count DESC LIMIT 1;",
      "hints": [
        "Define items as total quantity.",
        "Group by order.",
        "Sort descending and limit."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "order_id"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 45,
      "difficulty": "Interview Style",
      "text": "Which city has the highest average customer revenue?",
      "sql": "WITH customer_revenue AS (SELECT c.customer_id, c.city, SUM(oi.quantity * oi.unit_price) AS revenue FROM customers c JOIN orders o ON o.customer_id = c.customer_id JOIN order_items oi ON oi.order_id = o.order_id GROUP BY c.customer_id, c.city) SELECT city, ROUND(AVG(revenue), 2) AS average_customer_revenue FROM customer_revenue GROUP BY city ORDER BY average_customer_revenue DESC LIMIT 1;",
      "hints": [
        "First calculate revenue per customer.",
        "Then average customer revenue by city.",
        "Sort descending and keep one."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "city"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 46,
      "difficulty": "Interview Style",
      "text": "Find customers who have placed orders but only have Completed orders.",
      "sql": "SELECT c.customer_id, c.customer_name FROM customers c JOIN orders o ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.customer_name HAVING COUNT(*) > 0 AND SUM(CASE WHEN o.status <> 'Completed' THEN 1 ELSE 0 END) = 0;",
      "hints": [
        "Group orders by customer.",
        "Require at least one order.",
        "Ensure no non-Completed order exists."
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
      "num": 47,
      "difficulty": "Interview Style",
      "text": "Find the cancellation rate by country.",
      "sql": "SELECT c.country, ROUND(100.0 * SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate FROM customers c JOIN orders o ON o.customer_id = c.customer_id GROUP BY c.country;",
      "hints": [
        "Group orders by customer country.",
        "Conditionally count cancellations.",
        "Divide by all orders in each country."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
        "requiredColumns": [
          "country",
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
      "num": 48,
      "difficulty": "Interview Style",
      "text": "Find revenue by month.",
      "sql": "SELECT strftime('%Y-%m', o.order_date) AS month, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.order_id GROUP BY strftime('%Y-%m', o.order_date);",
      "hints": [
        "Use SQLite strftime.",
        "Group by year and month.",
        "Sum revenue in each month."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "grouped-metric",
        "requiredColumns": [
          "month"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": false
      }
    },
    {
      "num": 49,
      "difficulty": "Interview Style",
      "text": "Find the best-performing month by revenue.",
      "sql": "SELECT strftime('%Y-%m', o.order_date) AS month, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.order_id GROUP BY strftime('%Y-%m', o.order_date) ORDER BY revenue DESC LIMIT 1;",
      "hints": [
        "Aggregate revenue by month.",
        "Sort descending.",
        "Keep the first month."
      ],
      "orderSensitive": true,
      "validation": {
        "type": "identify-entity",
        "requiredColumns": [
          "month"
        ],
        "optionalColumns": [],
        "allowExtraColumns": true,
        "ignoreColumnNames": true,
        "numericTolerance": 0.011,
        "orderSensitive": true
      }
    },
    {
      "num": 50,
      "difficulty": "Interview Style",
      "text": "Find the percentage contribution of each customer to total revenue.",
      "sql": "SELECT c.customer_id, c.customer_name, ROUND(100.0 * SUM(oi.quantity * oi.unit_price) / (SELECT SUM(quantity * unit_price) FROM order_items), 2) AS revenue_contribution_percentage FROM customers c JOIN orders o ON o.customer_id = c.customer_id JOIN order_items oi ON oi.order_id = o.order_id GROUP BY c.customer_id, c.customer_name;",
      "hints": [
        "Calculate revenue per customer.",
        "Divide by overall revenue.",
        "Multiply by 100.0."
      ],
      "orderSensitive": false,
      "validation": {
        "type": "percentage-rate",
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
    }
  ]
};
