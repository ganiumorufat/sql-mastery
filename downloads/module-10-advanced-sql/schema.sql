CREATE TABLE customers (
        customer_id INTEGER PRIMARY KEY,
        customer_name TEXT,
        city TEXT,
        country TEXT,
        signup_date TEXT
    );

CREATE TABLE departments(
  department_id INT,
  department_name TEXT
);

CREATE TABLE employees(
  employee_id INT,
  employee_name TEXT,
  department_id INT,
  hire_date TEXT,
  manager_id INT
);

CREATE TABLE order_items (
        order_item_id INTEGER PRIMARY KEY,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        unit_price NUMERIC,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

CREATE TABLE orders (
        order_id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        order_date TEXT,
        status TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );

CREATE TABLE products (
        product_id INTEGER PRIMARY KEY,
        product_name TEXT,
        category TEXT,
        price NUMERIC
    );

CREATE TABLE salaries(
  salary_id INT,
  employee_id INT,
  salary NUM,
  effective_date TEXT
);

CREATE INDEX IX_date_time_employees_department ON employees(department_id);

CREATE INDEX IX_date_time_employees_manager ON employees(manager_id);

CREATE INDEX IX_date_time_salaries_employee_date ON salaries(employee_id, effective_date);

CREATE INDEX IX_order_items_order ON order_items(order_id);

CREATE INDEX IX_order_items_product ON order_items(product_id);

CREATE INDEX IX_orders_customer_date ON orders(customer_id, order_date);

CREATE INDEX IX_orders_status_date ON orders(status, order_date);
