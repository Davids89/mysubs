import { describe, expect, it } from "vitest";

import {
  isPasswordLongEnough,
  isValidEmail,
  validatePasswordConfirmation,
} from "./auth-validation.js";

describe("auth validation", () => {
  it("accepts valid email addresses", () => {
    expect(isValidEmail("ana@correo.com")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(isValidEmail("ana")).toBe(false);
  });

  it("requires passwords to be at least eight characters", () => {
    expect(isPasswordLongEnough("1234567")).toBe(false);
    expect(isPasswordLongEnough("12345678")).toBe(true);
  });

  it("validates password confirmation", () => {
    expect(
      validatePasswordConfirmation({
        confirmPassword: "password123",
        password: "password123",
      }),
    ).toBe(true);
    expect(
      validatePasswordConfirmation({
        confirmPassword: "password124",
        password: "password123",
      }),
    ).toBe(false);
  });
});
