const db = require("../db/connection");
const request = require("supertest");
const { seed } = require("../db/seed");
const app = require("../app.js");
const data = require("../db/data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => db.end());

describe("/api", () => {
  test("GET - should return json object message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "all ok" });
      });
  });
});
describe("/api/restaurants", () => {
  test("GET - should return an array with restaurants objects", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then(({ body: { restaurants } }) => {
        expect(restaurants).toHaveLength(8);
        restaurants.forEach((restaurant) => {
          expect(restaurant).toEqual(
            expect.objectContaining({
              area_id: expect.any(Number),
              cuisine: expect.any(String),
              restaurant_id: expect.any(Number),
              restaurant_name: expect.any(String),
              website: expect.any(String),
            })
          );
        });
      });
  });
  test("POST - should return an object with new posted Restaurant", () => {
    const postRestaurant = {
      restaurant_name: "Continental",
      area_id: 1,
      cuisine: "Greek",
      website: "continental@sasgamaw.com",
    };
    return request(app)
      .post("/api/restaurants")
      .send(postRestaurant)
      .expect(201)
      .then(({ body: { newRestaurant } }) => {
        expect(newRestaurant).toEqual({
          restaurant_name: "Continental",
          area_id: 1,
          cuisine: "Greek",
          website: "continental@sasgamaw.com",
          restaurant_id: 9,
        });
      });
  });
});
describe("/api/restaurants/:restaurant_id", () => {
  test("DELETE - should delete specified restaurant from db return 204", () => {
    return request(app).delete("/api/restaurants/5").expect(204);
  });
  test("PATCH - should update area_id return updated object", () => {
    const update = { area_id: 2 };
    return request(app)
      .patch("/api/restaurants/3")
      .send(update)
      .expect(200)
      .then(({ body: { updatedRestaurant } }) => {
        expect(updatedRestaurant).toEqual({
          restaurant_id: 3,
          restaurant_name: "Rudys Pizza",
          area_id: 2,
          cuisine: "Neapolitan Pizzeria",
          website: "http://rudyspizza.co.uk/",
        });
      });
  });
});
