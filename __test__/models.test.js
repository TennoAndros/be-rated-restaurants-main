const db = require("../db/connection");
const request = require("supertest");
const { seed } = require("../db/seed");
const app = require("../app.js");
const data = require("../db/data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => db.end());

describe("returns restaurants", () => {
  test("should return json object message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "all ok" });
      });
  });
});
describe("returns all restaurants", () => {
  test("should return an array with restaurants objects", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          restaurants: [
            {
              restaurant_name: "Luck Lust Liquor & Burn",
              area_name: "Northern Quarter",
              cuisine: "Mexican",
              website: "http://lucklustliquorburn.com/",
            },
            {
              restaurant_name: "The Oast House",
              area_name: "Spinningfields",
              cuisine: "Gastropub and Grill",
              website: "http://theoasthouse.uk.com/",
            },
            {
              restaurant_name: "Rudys Pizza",
              area_name: "Ancoats",
              cuisine: "Neapolitan Pizzeria",
              website: "http://rudyspizza.co.uk/",
            },
            {
              restaurant_name: "This & That",
              area_name: "Northern Quarter",
              cuisine: "Family Run Indian Curryhouse",
              website: "http://www.thisandthatcafe.co.uk/",
            },
            {
              restaurant_name: "Pieminister",
              area_name: "Northern Quarter",
              cuisine: "Pies And More Pies",
              website: "",
            },
            {
              restaurant_name: "Australasia",
              area_name: "Spinningfields",
              cuisine: "Australasian Cuisine",
              website: "http://australasia.uk.com/",
            },
            {
              restaurant_name: "Dehli 2 go",
              area_name: "Northern Quarter",
              cuisine: "Late night food",
              website: "http://delhi2go-online.co.uk/",
            },
            {
              restaurant_name: "Vivid Lounge",
              area_name: "Ancoats",
              cuisine: "Chic Thai Eatery",
              website: "http://www.vividlounge.uk/",
            },
          ],
        });
      });
  });
});
