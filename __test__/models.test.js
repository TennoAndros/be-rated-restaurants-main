const { db } = require("../db/connection");
const request = require("supertest");
const { seed } = require("../db/seed");
const { app } = require("../app.js");
const data = require("../db/data/index");

beforeEach(() => {
  return seed();
});

afterAll(() => {
  if (db.end) db.end();
});

describe("returns restaurants", () => {
  test("should return json object message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        console.log("EDWWWWWWWWW", res);
        expect(res).toEqual({ message: "all ok" });
      });
  });
});
