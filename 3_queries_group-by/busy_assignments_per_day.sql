-- The same query as before, but only return rows where total assignments is greater than or equal to 10.

SELECT day, count(*) 
FROM assignments
Group By day
HAVING count(*) >= 10
Order By day;