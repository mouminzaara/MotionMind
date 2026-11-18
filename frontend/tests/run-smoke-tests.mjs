import test from "node:test";
import assert from "node:assert/strict";
import { API_BASE_URL, fetchBackendHealth } from "../lib/api.ts";
import { cn, formatDate } from "../lib/utils.ts";

test("API client uses proper default base URL", () => {
  assert.ok(API_BASE_URL);
  assert.strictEqual(typeof API_BASE_URL, "string");
  assert.ok(API_BASE_URL.startsWith("http"));
});

test("Classnames utility merges tokens correctly", () => {
  const combined = cn("btn", true && "btn-primary", false && "btn-hidden", undefined, "p-4");
  assert.strictEqual(combined, "btn btn-primary p-4");
});

test("Date formatting handles standard dates", () => {
  const formatted = formatDate(new Date("2026-11-18T12:00:00Z"));
  assert.strictEqual(typeof formatted, "string");
  assert.ok(formatted.length > 0);
});

test("fetchBackendHealth function contract is defined", () => {
  assert.strictEqual(typeof fetchBackendHealth, "function");
});

