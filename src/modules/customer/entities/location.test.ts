import { test } from "vitest";
import { Location } from "./location";

test("should create a location object given x and y", ({ expect }) => {
  const location = new Location(1, 2);
  expect(location).toEqual({ x: 1, y: 2 });
});

test("should calculate the distance between two locations", ({ expect }) => {
  const location1 = new Location(1, 1);
  const location2 = new Location(4, 5);
  expect(location1.distanceTo(location2)).toBe(5);
});

test("should calculate the distance between two locations with negative coordinates", ({
  expect,
}) => {
  const location1 = new Location(-1, -1);
  const location2 = new Location(-4, -5);
  expect(location1.distanceTo(location2)).toBe(5);
});

test("shoul return a JSON serializable object", ({ expect }) => {
  const location = new Location(1, 2);
  expect(location.toJSONSerializable()).toEqual({ x: 1, y: 2 });
});
