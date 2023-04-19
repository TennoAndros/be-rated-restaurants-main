const { restaurants } = require("../db/data");
const {
  selectRestaurants,
  insertRestaurant,
  deleteRestaurantById,
  updateRestaurantById,
  selectRestaurantsByArea,
} = require("../models/restaurantModels");


exports.getEndpoints = (req, res) => {
  res.status(200).send({ message: "all ok" });
};
exports.getRestaurants = (req, res) => {
  selectRestaurants().then((restaurants) =>
    res.status(200).send({ restaurants })
  );
};
exports.postRestaurant = (req, res) => {
  insertRestaurant(req.body).then((newRestaurant) =>
    res.status(201).send({ newRestaurant })
  );
};
exports.deleteRestaurant = (req, res) => {
  const deleteId = req.params.restaurant_id;
  deleteRestaurantById(deleteId).then(() => res.status(204).send());
};
exports.patchRestaurant = (req, res) => {
  const patchId = req.params.restaurant_id;
  updateRestaurantById(patchId, req.body).then((updatedRestaurant) => {
    res.status(200).send({ updatedRestaurant });
  });
};
exports.getRestaurantsByArea = (req, res) => {
  const getById = req.params.area_id;
  selectRestaurantsByArea(+getById).then((area) => {
    res.status(200).send({ area });
  });
};
