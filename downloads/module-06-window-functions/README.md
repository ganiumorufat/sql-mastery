# SQL Mastery Local Practice Pack

## Module 6: window functions

This pack contains:

- `module-06-window-functions.sqlite` — the SQLite practice database
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

1. Open `module-06-window-functions.sqlite` in your preferred SQLite tool.
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

- **departments** — 10 rows — department_id INTEGER, department_name TEXT
- **employees** — 200 rows — employee_id INTEGER, employee_name TEXT, department_id INTEGER, hire_date TEXT, manager_id INTEGER
- **salaries** — 600 rows — salary_id INTEGER, employee_id INTEGER, salary NUMERIC, effective_date TEXT

## Note

This local pack contains the questions and database only. It does not include the website validator, hints, or official solutions.
