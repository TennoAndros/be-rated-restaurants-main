const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "dev";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

module.exports = new Pool();
