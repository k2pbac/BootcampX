-- Get the cohort with the longest average duration of assistance requests

SELECT cohorts.name, avg(completed_at - started_at) as average_assistance_time 
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts on cohorts.id = students.cohort_id
GROUP BY cohorts.name
ORDER BY average_assistance_time DESC
LIMIT 1;