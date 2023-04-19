const express = require("express");
const {
  getEndpoints,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
  patchRestaurant,
  getRestaurantsByArea,
} = require("./controllers/restaurantControls");

const app = express();
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/restaurants", getRestaurants);

app.post("/api/restaurants", postRestaurant);

app.delete("/api/restaurants/:restaurant_id", deleteRestaurant);

app.patch("/api/restaurants/:restaurant_id", patchRestaurant);

app.get("/api/restaurants/:area_id/restaurants", getRestaurantsByArea);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
