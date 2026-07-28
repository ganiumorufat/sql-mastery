# SQL Mastery — Module 6: window functions

Total questions: **35**

Use the included SQLite database to solve the questions.

## Beginner

1. Display each employee with their latest salary and the average latest salary for their department.

2. Display each employee with their latest salary and the overall average latest salary.

3. Display each employee with their latest salary and the highest latest salary in their department.

4. Display each employee with their latest salary and the lowest latest salary in their department.

5. Display each employee with the total number of employees in their department.

## Ranking

6. Rank employees by their latest salary from highest to lowest.

7. Rank employees by their latest salary within each department.

8. Assign a row number to employees within each department based on latest salary from highest to lowest.

9. Rank latest employee salaries within each department using DENSE_RANK().

10. Compare ROW_NUMBER(), RANK(), and DENSE_RANK() on employees' latest salaries within each department.

## Previous and Next

11. Display each salary record with the employee's previous salary.

12. Display each salary record with the employee's next salary.

13. Calculate the salary increase amount for each employee salary record.

14. Calculate the salary increase percentage for each employee salary record.

15. Identify salary records where an employee's salary increased compared with their previous salary.

## Running Totals

16. Calculate the running total of all salary payments by effective date.

17. Calculate the running salary history for each employee.

18. Calculate the cumulative number of employees hired over time.

19. Calculate cumulative hires within each department.

20. Calculate the cumulative latest salary cost within each department, ordered from earliest to latest hire date.

## Advanced

21. Identify the latest salary record for each employee.

22. Identify the first salary record for each employee.

23. Identify employees who have more than one salary record.

24. Identify employees whose latest salary is above their department's average latest salary.

25. Identify the highest-paid employee or employees in each department.

26. Identify the second-highest distinct latest salary in each department.

27. Identify the top two latest salary levels in each department.

28. Identify the first employee hired in each department.

29. Identify the most recently hired employee in each department.

30. Calculate the gap between each employee's latest salary and their department's average latest salary.

## Interview Style

31. Explain why a window function alias cannot be referenced directly in the WHERE clause by returning employees above their department average through a CTE.

32. Identify the highest-paid employee in each department using a CTE and window functions.

33. Identify employees whose latest salary is higher than their manager's latest salary.

34. Identify departments where the highest latest salary is more than 20% above the department's average latest salary.

35. Identify the latest salary for each employee without using MAX() in the final SELECT statement.
