"use strict";

import request from "supertest";
import app from "../../server/src/app.js";
import { closePool } from "../../server/src/utils/database.js";
import { getAdminToken, getUserToken } from "./authHelper.js";

let adminToken = null;
let userToken = null;
const clearDiscountIds = [];

beforeAll(async () => {
  console.log("[BEFORE ALL] Setting up tokens for tests...");
  adminToken = await getAdminToken();
  userToken = await getUserToken();
  console.log("[BEFORE ALL] Tokens set up completed.");
  console.log("[BEFORE ALL] Admin Token:", adminToken);
  console.log("[BEFORE ALL] User Token:", userToken);
});

afterAll(async () => {
  console.log("[AFTER ALL] Cleaning up created discounts...");
  for (const id of clearDiscountIds) {
    try {
      await request(app)
        .delete(`/api/discounts/${id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
    } catch (error) {
      console.log(`Error cleaning up discount with id ${id}:`, error);
    }
  }
  await closePool();
});

// tests for discount endpoints
describe("Discount End points", () => {
  // tests for creating, retrieving, updating, and deleting discounts
  describe("POST /api/discounts", () => {
    it("should create a new discount with admin token", async () => {
      const newDiscount = {
        discount: 15,
        discount_code: "SUMMER15",
        date_start: "2024-06-01",
        date_end: "2024-06-30",
      };

      clearDiscountIds.push(newDiscount.id);

      const res = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newDiscount)
        .set("Accept", "application/json");

      clearDiscountIds.push(res.body.id);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.discount_code).toEqual("SUMMER15");

      // Create additional discounts for further tests

      const newDiscount2 = {
        discount: 20,
        discount_code: "SUMMER20",
        date_start: "2024-06-01",
        date_end: "2024-06-30",
      };

      const newDiscount3 = {
        discount: 20,
        discount_code: "SUMMER20",
        date_start: "2024-06-01",
        date_end: "2024-06-30",
      };
    });

    it("should fail to create a new discount with user token", async () => {
      const newDiscount = {
        discount: 10,
        discount_code: "USER10",
        date_start: "2024-06-01",
        date_end: "2024-06-30",
      };

      const res = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${userToken}`)
        .send(newDiscount)
        .set("Accept", "application/json");

      clearDiscountIds.push(newDiscount.id);

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  // tests for getting all discounts and by id
  describe("GET /api/discounts", () => {
    it("should retrieve all discounts with admin token", async () => {
      const res = await request(app)
        .get("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      console.log("GET /api/discounts admin response body:", res.body);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it("shouldn retrieve all discounts with user token", async () => {
      const res = await request(app)
        .get("/api/discounts")
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      console.log("GET /api/discounts user response body:", res.body.discount);

      // With the new router, regular users are forbidden from listing all discounts
      expect(res.statusCode).toEqual(403);
    });
  });

  // tests for getting, updating, and deleting discount by id
  describe("GET /api/discounts/:id", () => {
    it("should retrieve a discount by ID", async () => {
      const res = await request(app)
        .get("/api/discounts/1")
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", 1);
    });

    it("should return 404 for non-existing discount ID", async () => {
      const res = await request(app)
        .get("/api/discounts/9999")
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  // tests for updating discounts by id
  describe("PUT /api/discounts/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const newDiscount = {
        discount: 5,
        discount_code: "UPDATE_ME",
        date_start: "2024-07-01",
        date_end: "2024-07-31",
      };

      const res = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newDiscount)
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearDiscountIds.push(createdId);
    });

    it("should update an existing discount with admin token", async () => {
      const update = { discount: 50, discount_code: "UPDATED50" };

      const res = await request(app)
        .put(`/api/discounts/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(update)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", createdId);
      expect(res.body.discount_code).toEqual("UPDATED50");
    });

    it("should not allow a regular user to update a discount", async () => {
      const update = { discount: 30 };

      const res = await request(app)
        .put(`/api/discounts/${createdId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send(update)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("DELETE /api/discounts/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const newDiscount = {
        discount: 7,
        discount_code: "DELETE_ME",
        date_start: "2024-08-01",
        date_end: "2024-08-31",
      };

      const res = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newDiscount)
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearDiscountIds.push(createdId);
    });

    it("should delete a discount with admin token", async () => {
      const res = await request(app)
        .delete(`/api/discounts/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
    });

    it("should return 404 for getting deleted discount", async () => {
      const res = await request(app)
        .get(`/api/discounts/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(404);
    });

    it("should not allow a regular user to delete a discount", async () => {
      const newDiscount = {
        discount: 3,
        discount_code: "NO_DELETE",
        date_start: "2024-09-01",
        date_end: "2024-09-30",
      };

      const created = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newDiscount)
        .set("Accept", "application/json");

      const idToTry = created.body.id;
      clearDiscountIds.push(idToTry);

      const res = await request(app)
        .delete(`/api/discounts/${idToTry}`)
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("POST /api/discounts/list/id", () => {
    it("should return discount objects for an array of ids", async () => {
      // create two discounts to query
      const d1 = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          discount: 2,
          discount_code: "LIST1",
          date_start: "2024-10-01",
          date_end: "2024-10-31",
        })
        .set("Accept", "application/json");
      clearDiscountIds.push(d1.body.id);

      const d2 = await request(app)
        .post("/api/discounts")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          discount: 4,
          discount_code: "LIST2",
          date_start: "2024-10-01",
          date_end: "2024-10-31",
        })
        .set("Accept", "application/json");
      clearDiscountIds.push(d2.body.id);

      const ids = [d1.body.id, d2.body.id];

      const res = await request(app)
        .post("/api/discounts/list/id")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ discounts: ids })
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toEqual(2);
      const returnedIds = res.body.map((d) => d && d.id).filter(Boolean);
      expect(returnedIds).toEqual(expect.arrayContaining(ids));
    });
  });
});
