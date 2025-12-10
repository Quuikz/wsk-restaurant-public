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

describe("User End points", () => {
  const clearUserIds = [];

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const unique = Date.now();
      const newUser = {
        username: `test_user_${unique}`,
        password: "TestPass123!",
        name: "Test User",
        email: `test_${unique}@example.com`,
      };

      const res = await request(app)
        .post("/api/users")
        .send(newUser)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("username", newUser.username);
      expect(res.body).not.toHaveProperty("password");

      clearUserIds.push(res.body.id);
    });
  });

  describe("GET /api/users", () => {
    it("should retrieve all users with admin token", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/users/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          username: `temp_user_${Date.now()}`,
          password: "pw12345",
          name: "Temp",
          email: "temp@example.com",
        })
        .set("Accept", "application/json");
      createdId = res.body.id;
      clearUserIds.push(createdId);
    });

    it("should retrieve a user by ID with admin token", async () => {
      const res = await request(app)
        .get(`/api/users/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", createdId);
    });
  });

  describe("PUT /api/users/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          username: `upd_user_${Date.now()}`,
          password: "pw12345",
          name: "ToUpdate",
          email: "upd@example.com",
        })
        .set("Accept", "application/json");
      createdId = res.body.id;
      clearUserIds.push(createdId);
    });

    it("should allow admin to update a user", async () => {
      const res = await request(app)
        .put(`/api/users/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "Updated Name" })
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id", createdId);
      expect(res.body).toHaveProperty("name", "Updated Name");
    });
  });

  describe("DELETE /api/users/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          username: `del_user_${Date.now()}`,
          password: "pw12345",
          name: "ToDelete",
          email: "del@example.com",
        })
        .set("Accept", "application/json");
      createdId = res.body.id;
      clearUserIds.push(createdId);
    });

    it("should delete a user with admin token", async () => {
      const res = await request(app)
        .delete(`/api/users/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.text).toBeTruthy();
    });

    it("should return 404 for getting deleted user", async () => {
      const res = await request(app)
        .get(`/api/users/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("GET /api/users/username/exists/:username and POST /api/users/list/id", () => {
    it("should report username existence and return list by ids", async () => {
      const u1 = await request(app)
        .post("/api/users")
        .send({
          username: `list_user1_${Date.now()}`,
          password: "pw1",
          name: "L1",
          email: "l1@example.com",
        })
        .set("Accept", "application/json");
      clearUserIds.push(u1.body.id);

      const u2 = await request(app)
        .post("/api/users")
        .send({
          username: `list_user2_${Date.now()}`,
          password: "pw2",
          name: "L2",
          email: "l2@example.com",
        })
        .set("Accept", "application/json");
      clearUserIds.push(u2.body.id);

      const existsRes = await request(app)
        .get(`/api/users/username/exists/${u1.body.username}`)
        .set("Accept", "application/json");
      expect(existsRes.statusCode).toEqual(200);
      expect(existsRes.body).toEqual(true);

      const ids = [u1.body.id, u2.body.id];
      const resList = await request(app)
        .post(`/api/users/list/id`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ users: ids })
        .set("Accept", "application/json");

      expect(resList.statusCode).toEqual(200);
      expect(Array.isArray(resList.body)).toBe(true);
      const returnedIds = resList.body.map((d) => d && d.id).filter(Boolean);
      expect(returnedIds).toEqual(expect.arrayContaining(ids));
    });
  });
});
