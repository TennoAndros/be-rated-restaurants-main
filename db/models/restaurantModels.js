const db = require("../connection");

exports.selectRestaurants = () => {
  return db.query(`SELECT * FROM restaurants`).then((result) => result.rows);
};
