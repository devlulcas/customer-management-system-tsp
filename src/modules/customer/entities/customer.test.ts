import { test } from "vitest";
import { Customer } from "./customer";
import { Location } from "./location";

test("should create a customer with valid data", ({ expect }) => {
  expect(
    new Customer("John Doe", "doe@doe.com", "77981175919", new Location(1, 1))
  ).toBeInstanceOf(Customer);
});

test("should throw an invalid input exception given an invalid email", ({
  expect,
}) => {
  expect(
    () => new Customer("John Doe", "a", "77981175919", new Location(1, 1))
  ).toThrow();
});
