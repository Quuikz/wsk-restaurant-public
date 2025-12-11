"use strict";

import request from "supertest";
import app from "../../server/src/app.js";
import { closePool } from "../../server/src/utils/database.js";
import { getAdminToken, getUserToken } from "./authHelper.js";

let adminToken = null;
let userToken = null;
const clearMenuIds = [];

beforeAll(async () => {
  adminToken = await getAdminToken();
  userToken = await getUserToken();
});

afterAll(async () => {
  for (const id of clearMenuIds) {
    try {
      await request(app)
        .delete(`/api/menus/${id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");
    } catch (error) {
      console.log(
        `Error cleaning up menu with id ${id}:`,
        error.message || error
      );
    }
  }
  await closePool();
});

describe("Menu End points", () => {
  describe("POST /api/menus", () => {
    it("should create a new menu with admin token", async () => {
      const newMenu = {
        date: "2025-12-11",
        week: 50,
        special_meal: 1,
        meals: [],
      };

      const res = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newMenu)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id");
      expect(res.body.date).toEqual(newMenu.date);

      clearMenuIds.push(res.body.id);
    });

    it("should fail to create a new menu with user token", async () => {
      const newMenu = {
        date: "2025-12-12",
        week: 50,
        special_meal: 1,
        meals: [],
      };

      const res = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${userToken}`)
        .send(newMenu)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("GET /api/menus", () => {
    it("should retrieve all menus", async () => {
      const res = await request(app)
        .get("/api/menus")
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/menus/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const newMenu = {
        date: "2025-12-13",
        week: 50,
        special_meal: 1,
        meals: [],
      };
      const res = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newMenu)
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearMenuIds.push(createdId);
    });

    it("should retrieve a menu by ID", async () => {
      const res = await request(app)
        .get(`/api/menus/${createdId}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", createdId);
    });

    it("should return 404 for non-existing menu ID", async () => {
      const res = await request(app)
        .get(`/api/menus/999999`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("PUT /api/menus/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const newMenu = {
        date: "2025-12-14",
        week: 51,
        special_meal: 1,
        meals: [],
      };
      const res = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newMenu)
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearMenuIds.push(createdId);
    });

    it("should update an existing menu with admin token", async () => {
      const update = { date: "2025-12-15", week: 52 };

      const res = await request(app)
        .put(`/api/menus/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(update)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body).toHaveProperty("id", createdId);
      expect(res.body.date).toEqual(update.date);
    });

    it("should not allow a regular user to update a menu", async () => {
      const res = await request(app)
        .put(`/api/menus/${createdId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ week: 99 })
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("DELETE /api/menus/:id", () => {
    let createdId = null;

    beforeAll(async () => {
      const newMenu = {
        date: "2025-12-16",
        week: 51,
        special_meal: 1,
        meals: [],
      };
      const res = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newMenu)
        .set("Accept", "application/json");

      createdId = res.body.id;
      clearMenuIds.push(createdId);
    });

    it("should delete a menu with admin token", async () => {
      const res = await request(app)
        .delete(`/api/menus/${createdId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.text).toBeTruthy();
    });

    it("should return 404 for getting deleted menu", async () => {
      const res = await request(app)
        .get(`/api/menus/${createdId}`)
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(404);
    });

    it("should not allow a regular user to delete a menu", async () => {
      const created = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ date: "2025-12-17", week: 51, special_meal: 1, meals: [] })
        .set("Accept", "application/json");

      const idToTry = created.body.id;
      clearMenuIds.push(idToTry);

      const res = await request(app)
        .delete(`/api/menus/${idToTry}`)
        .set("Authorization", `Bearer ${userToken}`)
        .set("Accept", "application/json");

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(500);
    });
  });

  describe("GET /api/menus/date/:date and /api/menus/week/:week", () => {
    it("should return menus for a given date and week", async () => {
      const date = "2025-12-18";
      const week = 52;
      const resCreate = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ date, week, special_meal: 1, meals: [] })
        .set("Accept", "application/json");
      clearMenuIds.push(resCreate.body.id);

      const resByDate = await request(app)
        .get(`/api/menus/date/${date}`)
        .set("Accept", "application/json");

      expect(resByDate.statusCode).toEqual(200);
      expect(Array.isArray(resByDate.body)).toBe(true);

      const resByWeek = await request(app)
        .get(`/api/menus/week/${week}`)
        .set("Accept", "application/json");

      expect(resByWeek.statusCode).toEqual(200);
      expect(Array.isArray(resByWeek.body)).toBe(true);
    });
  });

  describe("POST /api/menus/list/id", () => {
    it("should return menu objects for an array of ids", async () => {
      const d1 = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ date: "2025-12-19", week: 52, special_meal: 1, meals: [] })
        .set("Accept", "application/json");
      clearMenuIds.push(d1.body.id);

      const d2 = await request(app)
        .post("/api/menus")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ date: "2025-12-20", week: 52, special_meal: 1, meals: [] })
        .set("Accept", "application/json");
      clearMenuIds.push(d2.body.id);

      const ids = [d1.body.id, d2.body.id];

      const res = await request(app)
        .post("/api/menus/list/id")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ menus: ids })
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toEqual(2);
      const returnedIds = res.body.map((d) => d && d.id).filter(Boolean);
      expect(returnedIds).toEqual(expect.arrayContaining(ids));
    });
  });
});
