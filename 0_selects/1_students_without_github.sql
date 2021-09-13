-- Select their id, name, email, and cohort_id.
-- Order them by cohort_id.
--Example 1

select id, name, email, cohort_id 
from students
where (github = '') IS NOT FALSE
Order By cohort_id;