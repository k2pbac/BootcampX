-- Calculate the average total duration of assistance requests for each cohort.

-- Use the previous query as a sub query to determine the duration per cohort.
-- Return a single row average_total_duration

SELECT sum(total)/count(*) as average_total_duration
FROM (SELECT sum(completed_at - started_at) total
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts on cohorts.id = students.cohort_id
GROUP BY cohorts.name
ORDER BY total) as total_duration