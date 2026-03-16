import { describe, expect, it } from "@jest/globals";
import { calculatePoints } from "../../src/middle/06-calculatePoints";

describe("calculatePoints", () => {
  it("bronzeは1%", () => {
    expect(calculatePoints(1000, "bronze")).toBe(10);
  });

  it("silverは3%", () => {
    expect(calculatePoints(1000, "silver")).toBe(30);
  });

  it("goldは5%", () => {
    expect(calculatePoints(1000, "gold")).toBe(50);
  });

  it("rank未指定時はbronze", () => {
    expect(calculatePoints(1000)).toBe(10);
  });

  it("小数点以下は切り捨て", () => {
    expect(calculatePoints(999, "gold")).toBe(49);
  });

  it("負数は例外", () => {
    expect(() => calculatePoints(-1, "gold")).toThrowError("amount must be 0 or more");
  });
});
