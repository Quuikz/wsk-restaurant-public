"use strict";

import request from "supertest";
import app from "../../server/src/app.js";
import { closePool } from "../../server/src/utils/database.js";
import { getAdminToken, getUserToken } from "./authHelper.js";

let adminToken = null;
let userToken = null;
const clearLocationIds = [];

beforeAll(async () => {
  adminToken = await getAdminToken();
  userToken = await getUserToken();
});

afterAll(async () => {
  for (const id of clearLocationIds) {
    try {
      await request(app)
        .delete(`/api/locations/${id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
    } catch (error) {
      console.log(
        `Error cleaning up location with id ${id}:`,
        error.message || error
      );
    }
  }
  await closePool();
});

describe("Location End points", () => {
  describe("POST /api/locations", () => {
    it("should create a new location with admin token", async () => {
      const newLocation = {
        name: "Test Location",
        address: "123 Test St",
        email: "test@loc.example",
        phone: "555-0100",
        table_count: 20,
        message: "Created by test",
      };

      const res = await request(app)
        .post("/api/locations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newLocation)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toEqual("Test Location");

      clearLocationIds.push(res.body.id);
    });

    it("should fail to create a new location with user token", async () => {
      const newLocation = {
        name: "User Try",
        address: "Nope",
        email: "user@loc.example",
        phone: "555-0000",
        table_count: 10,
      };

      const res = await request(app)
        .post("/api/locations")
        .set("Authorization", `Bearer ${userToken}`)
        .send(newLocation)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("GET /api/locations", () => {
    it("should retrieve all locations (public endpoint)", async () => {
      const res = await request(app)
        .get("/api/locations")
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/locations/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/locations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "GetById Loc",
          address: "1 Id St",
          email: "id@loc.example",
          phone: "555-1111",
          table_count: 5,
        })
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearLocationIds.push(createdId);
    });

    it("should retrieve a location by ID", async () => {
      const res = await request(app)
        .get(`/api/locations/${createdId}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", createdId);
    });

    it("should return 404 for non-existing location ID", async () => {
      const res = await request(app)
        .get(`/api/locations/999999`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("PUT /api/locations/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/locations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "ToUpdate Loc",
          address: "Update St",
          email: "update@loc.example",
          phone: "555-2222",
          table_count: 8,
        })
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearLocationIds.push(createdId);
    });

    it("should update an existing location with admin token", async () => {
      const update = { name: "Updated Name", table_count: 50 };

      const res = await request(app)
        .put(`/api/locations/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(update)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id", createdId);
      expect(res.body.name).toEqual("Updated Name");
    });

    it("should not allow a regular user to update a location", async () => {
      const res = await request(app)
        .put(`/api/locations/${createdId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ name: "Bad Update" })
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("DELETE /api/locations/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/locations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "ToDelete Loc",
          address: "Delete St",
          email: "delete@loc.example",
          phone: "555-3333",
          table_count: 3,
        })
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearLocationIds.push(createdId);
    });

    it("should delete a location with admin token", async () => {
      const res = await request(app)
        .delete(`/api/locations/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.text).toBeTruthy();
    });

    it("should return 404 for getting deleted location", async () => {
      const res = await request(app)
        .get(`/api/locations/${createdId}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });

    it("should not allow a regular user to delete a location", async () => {
      // create one to attempt delete
      const created = await request(app)
        .post("/api/locations")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "NoDelete Loc",
          address: "NoDel St",
          email: "nodelete@loc.example",
          phone: "555-4444",
          table_count: 2,
        })
        .set("Accept", "application/json");

      const idToTry = created.body.id;
      clearLocationIds.push(idToTry);

      const res = await request(app)
        .delete(`/api/locations/${idToTry}`)
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });
});
