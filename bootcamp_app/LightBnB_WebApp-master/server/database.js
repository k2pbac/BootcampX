const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  let q = `SELECT * 
  FROM users
  WHERE email = $1;
  `;
  return pool
    .query(q, [email])
    .then((results) => results.rows[0])
    .catch((err) => err.message);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  let q = `SELECT * 
  FROM users
  WHERE id = $1;
  `;
  return pool
    .query(q, [id])
    .then((results) => results.rows[0])
    .catch((err) => err.message);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const q = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;
  `;

  const { name, email, password } = user;

  return pool
    .query(q, [name, email, password])
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  let q = `SELECT * from properties
  JOIN reservations on reservations.property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2;`;

  return pool
    .query(q, [guest_id, limit])
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  let position = 1;
  // 2
  let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;

  // 3
  if (options && Object.values(options).length) {
    queryString += `WHERE `;
    for (let option in options) {
      if (option === "city") {
        queryParams.push(`%${options[option]}%`);
        queryString += `city LIKE $${position} `;
      } else if (option === "owner_id") {
        queryParams.push(`${options[option]}`);
        queryString += `owner_id = $${position} `;
      } else if (option === "minimum_price_per_night") {
        queryParams.push(`${options[option]}`);
        queryString += `cost_per_night / 100 >= $${position}`;
      } else if (option === "maximum_price_per_night") {
        queryParams.push(`${options[option]}`);
        queryString += `cost_per_night / 100 <= $${position}`;
      } else if (option === "minimum_rating") {
        queryParams.push(`${options[option]}`);
        queryString += `rating >= $${position}`;
      }
      if (Object.values(options).length > position) {
        position++;
        queryString += ` AND `;
      }
    }
  }

  // 4
  queryParams.push(limit);
  queryString += `
   GROUP BY properties.id
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;

  // 5
  // console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const newProperty = { owner_id: property["owner_id"], ...property };
  console.log(newProperty);
  const q = `INSERT INTO properties (owner_id, title, description, number_of_bathrooms, number_of_bedrooms,  parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url,
   street, country, city, province, post_code)
  VALUES (${Array.from({ length: 14 }, (_, i) => "$" + +(i + 1)).join(
    ", "
  )}) RETURNING *;`;

  console.log(q);
  const values = Object.values(newProperty);

  return pool
    .query(q, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};
exports.addProperty = addProperty;
