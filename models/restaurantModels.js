const db = require("../db/connection");
const format = require("pg-format");

exports.selectRestaurants = () => {
  return db.query(`SELECT * FROM restaurants`).then((result) => result.rows);
};

exports.insertRestaurant = ({ restaurant_name, area_id, cuisine, website }) => {
  return db
    .query(
      `INSERT INTO restaurants (restaurant_name,area_id,cuisine,website) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [restaurant_name, area_id, cuisine, website]
    )
    .then(({ rows }) => rows[0]);
};
exports.deleteRestaurantById = (id) => {
  return db.query(`DELETE FROM restaurants WHERE restaurant_id=$1`, [id]);
};
exports.updateRestaurantById = (id, updates) => {
  let query = "UPDATE restaurants SET ";
  for (let key of Object.keys(updates)) {
    query += `${key}=${updates[key]}, `;
  }
  let editedQuery = query.slice(0, query.length - 2);
  editedQuery += " WHERE restaurant_id=$1 RETURNING *;";
  return db.query(editedQuery, [id]).then(({ rows }) => rows[0]);
};
