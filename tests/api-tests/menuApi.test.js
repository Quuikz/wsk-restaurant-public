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

describe("Menu End points", () => {
  test.todo("should implement menu creation endpoint tests");

  it("placeholder test - not yet implemented", () => {
    console.log("Menu API tests not implemented yet");
  });
});
