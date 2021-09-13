-- Get the total amount of time that all students from a specific cohort have spent on all assignments.


-- This should work for any cohort but use FEB12 for now.
-- Select only the total amount of time as a single column.


SELECT sum(assignment_submissions.duration) as total_duration
FROM cohorts 
JOIN students ON students.cohort_id = cohorts.id
JOIN assignment_submissions ON students.id = assignment_submissions.student_id
WHERE cohorts.name = 'FEB12';