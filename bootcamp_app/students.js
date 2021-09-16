const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});
let args = process.argv.slice(2);
let values = ["%" + args[0] + "%", args[1] || 5];
pool
  .query(
    `
SELECT students.id as student_id, students.name as student_name, cohorts.name as cohort
FROM students
JOIN cohorts on students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2
`,
    values
  )
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));
