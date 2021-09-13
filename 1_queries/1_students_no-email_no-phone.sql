-- Get all of the students that don't have an email or phone number.
-- Get their name, id, and cohort_id.

SELECT name, id, cohort_id
FROM students
WHERE (email = '' or phone = '') IS NOT FALSE;