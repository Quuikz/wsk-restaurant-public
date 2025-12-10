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

// tests for authentication endpoints
describe("Authentication End points", () => {
  //  tests for login and token validation
  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "admin", password: "password" })
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });
  });

  // Token validation tests, for user
  describe("GET /api/auth/validate", () => {
    it("should validate token for admin user", async () => {
      const res = await request(app)
        .get("/api/auth/validate")
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
    });
  });

  // Token validation tests, for admin
  describe("GET /api/auth/validate", () => {
    it("should validate token for admin user", async () => {
      const res = await request(app)
        .get("/api/auth/validate")
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
    });
  });
});
