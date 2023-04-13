const express = require("express");
const {
  getEndpoints,
  getRestaurants,
  postRestaurant,
  deleteRestaurantById,
  patchRestaurantById,
} = require("./controllers/restaurantControls");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/restaurants", getRestaurants);

// app.post("/api/restaurants", postRestaurant);

// app.delete("/api/restaurants/:restaurant_id", deleteRestaurantById);

// app.patch("/api/restaurants/:restaurant_id", patchRestaurantById);

module.exports = app;
