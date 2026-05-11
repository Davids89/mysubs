import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../../src/infrastructure/http/create-app.js";

describe("GET /health", () => {
  it("returns the backend health status", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
