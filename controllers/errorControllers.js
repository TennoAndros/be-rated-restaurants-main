exports.handlePqslErrors = (err, req, res, next) => {
  console.log(err);
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ msg: err.msg });
  }
};
