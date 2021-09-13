-- Get all cohorts with 18 or more students.

-- Select the cohort name and the total students.
-- Order by total students from smallest to greatest.

SELECT cohorts.name as cohort_name, count(cohorts.*) as student_count
FROM students 
JOIN cohorts ON cohorts.id = students.cohort_id
Group By cohort_name
HAVING count(cohorts.*) >= 18
Order By count(cohorts.*) ASC;