-- Calculate the average time it takes to start an assistance request.


-- We need to know the average amount of time that students are waiting for an assistance request. 
-- This is the duration between an assistance request being created, and it being started.

SELECT avg(started_at - created_at) 
FROM assistance_requests;