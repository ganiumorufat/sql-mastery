# SQL Mastery Local Practice Pack

## Module 9: business kpis

This pack contains:

- `module-09-business-kpis.sqlite` — the SQLite practice database
- `questions.md` — the module questions
- `questions.txt` — a plain-text version
- `schema.sql` — the database structure
- `README.md` — setup instructions

## Recommended tools

You can open the database with any SQLite-compatible tool, including:

- DB Browser for SQLite
- DBeaver
- VS Code with a SQLite extension
- SQLite command-line tools
- Python's built-in `sqlite3` library

## How to practise

1. Open `module-09-business-kpis.sqlite` in your preferred SQLite tool.
2. Open `questions.md`.
3. Write and run your SQL answers against the database.
4. Keep your own `.sql` file to save your solutions.

## SQL dialect

The database uses **SQLite**.

Common SQLite equivalents:

- `LIMIT 1` instead of `TOP 1`
- `strftime('%Y', date_column)` instead of `YEAR(date_column)`
- `strftime('%m', date_column)` instead of `MONTH(date_column)`
- `IFNULL(value, 0)` instead of `ISNULL(value, 0)`

## Database tables

- **customers** — 200 rows — customer_id INTEGER, customer_name TEXT, city TEXT, country TEXT, signup_date TEXT
- **departments** — 10 rows — department_id INT, department_name TEXT
- **employees** — 200 rows — employee_id INT, employee_name TEXT, department_id INT, hire_date TEXT, manager_id INT
- **order_items** — 2989 rows — order_item_id INTEGER, order_id INTEGER, product_id INTEGER, quantity INTEGER, unit_price NUMERIC
- **orders** — 1000 rows — order_id INTEGER, customer_id INTEGER, order_date TEXT, status TEXT
- **products** — 75 rows — product_id INTEGER, product_name TEXT, category TEXT, price NUMERIC
- **salaries** — 600 rows — salary_id INT, employee_id INT, salary NUM, effective_date TEXT

## Note

This local pack contains the questions and database only. It does not include the website validator, hints, or official solutions.
