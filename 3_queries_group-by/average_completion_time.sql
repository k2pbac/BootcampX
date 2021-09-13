-- Get currently enrolled students' average assignment completion time.

-- Select the students name and average time from assignment submissions.
-- Order the results from greatest duration to least greatest duration.
-- A student will have a null end_date if they are currently enrolled

--Assigment submission for duration

SELECT students.name, AVG(assignment_submissions.duration) 
FROM students
JOIN assignment_submissions on students.id = assignment_submissions.student_id
WHERE students.end_date IS NULL
GROUP BY students.name
ORDER BY AVG(assignment_submissions.duration) DESC;