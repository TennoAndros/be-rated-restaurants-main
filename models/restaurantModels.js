const db = require("../db/connection");
const format = require("pg-format");

exports.selectRestaurants = () => {
  return db
    .query(
      `SELECT restaurants.*, AVG(rating)::NUMERIC(10, 2)::Int AS average_rating FROM restaurants INNER JOIN ratings ON restaurants.restaurant_id = ratings.restaurant_id GROUP BY restaurants.restaurant_id`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertRestaurant = ({ restaurant_name, area_id, cuisine, website }) => {
  return db
    .query(
      `INSERT INTO restaurants (restaurant_name,area_id,cuisine,website) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [restaurant_name, area_id, cuisine, website]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    });
};
exports.deleteRestaurantById = (id) => {
  return db
    .query(`DELETE FROM restaurants WHERE restaurant_id=$1 RETURNING *`, [id])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ code: 404, msg: "Restaurant not found." });
    });
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
exports.selectRestaurantsByArea = async (id) => {
  // const areaData = { area_id: id };
  const promise1 = db.query(`SELECT area_name FROM areas WHERE area_id=$1`, [
    id,
  ]);
  const promise2 = db.query(
    `SELECT restaurant_name, cuisine, website FROM restaurants WHERE area_id=$1`,
    [id]
  );

  // Promise.all([promise1, promise2]).then(([result1, result2]) => {
  //   areaData.name = result1.rows[0].area_name;

  //   areaData.restaurants = result2.rows;

  //   areaData.total_restaurants = result2.rows.length;

  //   return areaData
  // })

  const results = await Promise.all([promise1, promise2]);
  return {
    area_id: id,
    name: results[0].rows[0].area_name,
    total_restaurants: results[1].rows.length,
    restaurants: results[1].rows.map((restaurant) => {
      restaurant.area_name = results[0].rows[0].area_name;
      return restaurant;
    }),
  };
};
