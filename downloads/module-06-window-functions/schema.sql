CREATE TABLE departments (
        department_id INTEGER PRIMARY KEY,
        department_name TEXT
    );

CREATE TABLE employees (
        employee_id INTEGER PRIMARY KEY,
        employee_name TEXT,
        department_id INTEGER,
        hire_date TEXT,
        manager_id INTEGER,
        FOREIGN KEY (department_id) REFERENCES departments(department_id),
        FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
    );

CREATE TABLE salaries (
        salary_id INTEGER PRIMARY KEY,
        employee_id INTEGER,
        salary NUMERIC,
        effective_date TEXT,
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    );

CREATE INDEX IX_employees_department ON employees(department_id);

CREATE INDEX IX_employees_manager ON employees(manager_id);

CREATE INDEX IX_salaries_employee_date ON salaries(employee_id, effective_date);
