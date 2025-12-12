"use strict";

import request from "supertest";
import app from "../../server/src/app.js";
import { closePool } from "../../server/src/utils/database.js";
import { getAdminToken, getUserToken } from "./authHelper.js";

let adminToken = null;
let userToken = null;
const clearMealIds = [];

beforeAll(async () => {
  adminToken = await getAdminToken();
  userToken = await getUserToken();
});

afterAll(async () => {
  // cleanup created meals
  for (const id of clearMealIds) {
    try {
      await request(app)
        .delete(`/api/meals/${id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
    } catch (error) {
      console.log(
        `Error cleaning up meal with id ${id}:`,
        error.message || error
      );
    }
  }
  await closePool();
});

describe("Meal End points", () => {
  describe("POST /api/meals", () => {
    it("should create a new meal with admin token using multipart form fields", async () => {
      const res = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "Test Meal FI")
        .field("name_en", "Test Meal EN")
        .field("description_fi", "Desc FI")
        .field("description_en", "Desc EN")
        .field("cost", "9.99")
        .field("type", "M")
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name_fi).toEqual("Test Meal FI");

      clearMealIds.push(res.body.id);
    });

    it("should fail to create a new meal with user token", async () => {
      const res = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${userToken}`)
        .field("name_fi", "User Meal")
        .field("name_en", "User Meal EN")
        .field("cost", "5.00")
        .field("type", "M")
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("GET /api/meals", () => {
    it("should retrieve all meals (public)", async () => {
      const res = await request(app)
        .get("/api/meals")
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/meals/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "GetById FI")
        .field("name_en", "GetById EN")
        .field("description_fi", "GetById desc FI")
        .field("description_en", "GetById desc EN")
        .field("cost", "7.50")
        .field("type", "M")
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearMealIds.push(createdId);
    });

    it("should retrieve a meal by ID", async () => {
      const res = await request(app)
        .get(`/api/meals/${createdId}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", createdId);
    });

    it("should return 404 for non-existing meal ID", async () => {
      const res = await request(app)
        .get(`/api/meals/999999`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("PUT /api/meals/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "ToUpdate FI")
        .field("name_en", "ToUpdate EN")
        .field("description_fi", "ToUpdate desc FI")
        .field("description_en", "ToUpdate desc EN")
        .field("cost", "6.00")
        .field("type", "M")
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearMealIds.push(createdId);
    });

    it("should update an existing meal with admin token", async () => {
      const res = await request(app)
        .put(`/api/meals/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .field("id", String(createdId))
        .field("name_fi", "Updated FI")
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id", createdId);
      expect(res.body.name_fi).toEqual("Updated FI");
    });

    it("should not allow a regular user to update a meal", async () => {
      const res = await request(app)
        .put(`/api/meals/${createdId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .field("id", String(createdId))
        .field("name_fi", "Bad Update")
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("DELETE /api/meals/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "ToDelete FI")
        .field("name_en", "ToDelete EN")
        .field("description_fi", "ToDelete desc FI")
        .field("description_en", "ToDelete desc EN")
        .field("cost", "4.00")
        .field("type", "M")
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearMealIds.push(createdId);
    });

    it("should delete a meal with admin token", async () => {
      const res = await request(app)
        .delete(`/api/meals/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.text).toBeTruthy();
    });

    it("should return 404 for getting deleted meal", async () => {
      const res = await request(app)
        .get(`/api/meals/${createdId}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });

    it("should not allow a regular user to delete a meal", async () => {
      const created = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "NoDelete FI")
        .field("name_en", "NoDelete EN")
        .field("description_fi", "NoDelete desc FI")
        .field("description_en", "NoDelete desc EN")
        .field("cost", "3.00")
        .field("type", "M")
        .set("Accept", "application/json");

      const idToTry = created.body.id;
      clearMealIds.push(idToTry);

      const res = await request(app)
        .delete(`/api/meals/${idToTry}`)
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("POST /api/meals/list/id", () => {
    it("should return meal objects for an array of ids", async () => {
      const d1 = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "LIST1 FI")
        .field("name_en", "LIST1 EN")
        .field("description_fi", "LIST1 desc FI")
        .field("description_en", "LIST1 desc EN")
        .field("cost", "1.00")
        .field("type", "M")
        .set("Accept", "application/json");
      clearMealIds.push(d1.body.id);

      const d2 = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${adminToken}`)
        .field("name_fi", "LIST2 FI")
        .field("name_en", "LIST2 EN")
        .field("description_fi", "LIST2 desc FI")
        .field("description_en", "LIST2 desc EN")
        .field("cost", "2.00")
        .field("type", "M")
        .set("Accept", "application/json");
      clearMealIds.push(d2.body.id);

      const ids = [d1.body.id, d2.body.id];

      const res = await request(app)
        .post("/api/meals/list/id")
        .send({ meals: ids })
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toEqual(2);
      const returnedIds = res.body.map((d) => d && d.id).filter(Boolean);
      expect(returnedIds).toEqual(expect.arrayContaining(ids));
    });
  });
});
