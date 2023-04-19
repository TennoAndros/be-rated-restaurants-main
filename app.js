const express = require("express");
const {
  getEndpoints,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
  patchRestaurant,
  getRestaurantsByArea,
} = require("./controllers/restaurantControls");
const {
  handlePqslErrors,
  handleCustomErrors,
} = require("./controllers/errorControllers");

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

//middlewares

app.use(handlePqslErrors);
app.use(handleCustomErrors);

module.exports = app;
