const express = require("express");
const {
  getEndpoints,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
  patchRestaurant,
} = require("./controllers/restaurantControls");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/restaurants", getRestaurants);

app.post("/api/restaurants", postRestaurant);

app.delete("/api/restaurants/:restaurant_id", deleteRestaurant);

app.patch("/api/restaurants/:restaurant_id", patchRestaurant);

module.exports = app;
