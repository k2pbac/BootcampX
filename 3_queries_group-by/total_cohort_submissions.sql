-- Get the total number of assignment submissions for each cohort.

-- Select the cohort name and total submissions.
-- Order the results from greatest to least submissions.

SELECT cohorts.name as cohort, count(assignment_submissions.*)
FROM cohorts 
JOIN students ON students.cohort_id = cohorts.id
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
GROUP BY cohorts.name
ORDER BY count(assignment_submissions.*) DESC;