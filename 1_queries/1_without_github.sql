-- Get all graduates without a linked Github account
-- Get their name, email, and phone.

select name, email, phone
from students
where (github = '') IS NOT FALSE
AND end_date IS NOT NULL;