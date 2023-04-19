const db = require("../db/connection");
const request = require("supertest");
const { seed } = require("../db/seed");
const app = require("../app.js");
const data = require("../db/data/index");
const { deleteRestaurant } = require("../controllers/restaurantControls");

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
          expect(restaurant).toEqual(
            expect.objectContaining({
              average_rating: expect.any(Number),
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
  test("ERROR - should return error 400 for POST when not valid body is sent", () => {
    const postRestaurant = {};
    return request(app)
      .post("/api/restaurants")
      .send(postRestaurant)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Bad request");
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
  test("ERROR - should return error 400 for DELETE when not valid delete_id is sent", () => {
    return request(app)
      .delete("/api/restaurants/notAnInt")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Bad request");
      });
  });
  test("ERROR - should return error 404 for DELETE when not valid delete_id is sent", () => {
    return request(app)
      .delete("/api/restaurants/500")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Restaurant not found.");
      });
  });
});
describe("/*", () => {
  test("should send error 404 and msg path not found", () => {
    return request(app)
      .get("/appi")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("path not found");
      });
  });
});
