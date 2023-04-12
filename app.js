const express = require("express");
const {
  getEndpoints,
  getRestaurant,
  postRestaurant,
  deleteRestaurantById,
  patchRestaurantById,
} = require("./controllers/restaurantControls");

const app = express();

app.get("/api", getEndpoints);

app.get("/api/restaurants", getRestaurant);

app.post("/api/restaurants", postRestaurant);

app.delete("/api/restaurants/:restaurant_id", deleteRestaurantById);

app.patch("/api/restaurants/:restaurant_id", patchRestaurantById);
