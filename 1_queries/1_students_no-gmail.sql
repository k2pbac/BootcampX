-- Get all of the students without a gmail.com account and a phone number.

-- Get their name, email, id, and cohort_id.

SELECT name, email, id, cohort_id
FROM students
WHERE (email = '%gmail.com') IS FALSE
AND (phone = '') IS NOT FALSE;