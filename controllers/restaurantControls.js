const { restaurants } = require("../db/data");
const { selectRestaurants } = require("../db/models/restaurantModels");

exports.getEndpoints = (req, res) => {
  res.status(200).send({ message: "all ok" });
};
exports.getRestaurants = (req, res) => {
  selectRestaurants().then((restaurants) =>
    res.status(200).send({ restaurants })
  );
};
