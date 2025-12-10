"use strict";

import request from "supertest";
import app from "../../server/src/app.js";
import { closePool } from "../../server/src/utils/database.js";
import { getAdminToken, getUserToken } from "./authHelper.js";

let adminToken = null;
let userToken = null;

beforeAll(async () => {
  console.log("[BEFORE ALL] Setting up tokens for tests...");
  adminToken = await getAdminToken();
  userToken = await getUserToken();
  console.log("[BEFORE ALL] Tokens set up completed.");
  console.log("[BEFORE ALL] Admin Token:", adminToken);
  console.log("[BEFORE ALL] User Token:", userToken);
});

afterAll(async () => {
  await closePool();
});

describe("Reservation End points", () => {
  const clearReservationIds = [];

  describe("POST /api/reservations", () => {
    it("should create a new reservation with user token", async () => {
      const newReservation = {
        user: 2,
        order: 1,
        date: "2025-12-11 12:00:00",
        table_customer_count: 2,
        grill_customer_count: 0,
        message: "reserve by test user",
      };

      const res = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${userToken}`)
        .send(newReservation)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id");
      clearReservationIds.push(res.body.id);
    });

    it("should allow admin to create a reservation", async () => {
      const newReservation = {
        user: 1,
        order: 2,
        date: "2025-12-11 13:00:00",
        table_customer_count: 4,
        grill_customer_count: 1,
        message: "reserve by admin",
      };

      const res = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newReservation)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id");
      clearReservationIds.push(res.body.id);
    });
  });

  describe("GET /api/reservations", () => {
    it("should retrieve all reservations with admin token", async () => {
      const res = await request(app)
        .get("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/reservations/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          user: 2,
          order: 3,
          date: "2025-12-11 14:00:00",
          table_customer_count: 1,
          grill_customer_count: 0,
        })
        .set("Accept", "application/json");
      createdId = res.body.id;
      clearReservationIds.push(createdId);
    });

    it("should retrieve a reservation by ID", async () => {
      const res = await request(app)
        .get(`/api/reservations/${createdId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", createdId);
    });

    it("should return 404 for non-existing reservation ID", async () => {
      const res = await request(app)
        .get(`/api/reservations/999999`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("PUT /api/reservations/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          user: 2,
          order: 4,
          date: "2025-12-11 15:00:00",
          table_customer_count: 2,
          grill_customer_count: 0,
        })
        .set("Accept", "application/json");
      createdId = res.body.id;
      clearReservationIds.push(createdId);
    });

    it("should allow admin to update a reservation", async () => {
      const res = await request(app)
        .put(`/api/reservations/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ table_customer_count: 6 })
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id", createdId);
    });
  });

  describe("DELETE /api/reservations/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          user: 2,
          order: 5,
          date: "2025-12-11 16:00:00",
          table_customer_count: 2,
          grill_customer_count: 0,
        })
        .set("Accept", "application/json");
      createdId = res.body.id;
      // we'll delete with admin in test; still track for cleanup in case delete fails
      clearReservationIds.push(createdId);
    });

    it("should delete a reservation with admin token", async () => {
      const res = await request(app)
        .delete(`/api/reservations/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.text).toBeTruthy();
    });

    it("should return 404 for getting deleted reservation", async () => {
      const res = await request(app)
        .get(`/api/reservations/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("GET /api/reservations/user/:id, /order/:id, /date/:date, /count/:date and list/id", () => {
    it("should return reservations for user, order, date, count, and list by ids", async () => {
      const r1 = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          user: 2,
          order: 10,
          date: "2025-12-11 17:00:00",
          table_customer_count: 2,
          grill_customer_count: 0,
        })
        .set("Accept", "application/json");
      clearReservationIds.push(r1.body.id);

      const r2 = await request(app)
        .post("/api/reservations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          user: 2,
          order: 10,
          date: "2025-12-11 17:00:00",
          table_customer_count: 3,
          grill_customer_count: 1,
        })
        .set("Accept", "application/json");
      clearReservationIds.push(r2.body.id);

      const resUser = await request(app)
        .get(`/api/reservations/user/2`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(resUser.statusCode).toEqual(200);
      expect(Array.isArray(resUser.body)).toBe(true);

      const resOrder = await request(app)
        .get(`/api/reservations/order/10`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(resOrder.statusCode).toEqual(200);
      expect(Array.isArray(resOrder.body)).toBe(true);

      const resDate = await request(app)
        .get(`/api/reservations/date/2025-12-11 17:00:00`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(resDate.statusCode).toEqual(200);
      expect(Array.isArray(resDate.body)).toBe(true);

      const resCount = await request(app)
        .get(`/api/reservations/count/2025-12-11 17:00:00`)
        .set("Accept", "application/json");
      expect(resCount.statusCode).toEqual(200);
      expect(
        typeof resCount.body === "number" || typeof resCount.body === "string"
      ).toBe(true);

      const ids = [r1.body.id, r2.body.id];
      const resList = await request(app)
        .post(`/api/reservations/list/id`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ reservations: ids })
        .set("Accept", "application/json");
      expect(resList.statusCode).toEqual(200);
      expect(Array.isArray(resList.body)).toBe(true);
      const returnedIds = resList.body.map((d) => d && d.id).filter(Boolean);
      expect(returnedIds).toEqual(expect.arrayContaining(ids));
    });
  });
});
