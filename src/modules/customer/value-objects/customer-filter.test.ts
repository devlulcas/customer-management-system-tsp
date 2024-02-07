import { test } from "vitest";
import { CustomerFilter } from "./customer-filter";

test("should throw an error if the filter type is not valid", ({ expect }) => {
  expect(() => new CustomerFilter("invalid", "xyz")).toThrowError(
    "Tipo de filtro inválido"
  );
});

test("should create a customer filter with name filter", ({ expect }) => {
  const customerFilter = new CustomerFilter("name", "xyz");
  expect(customerFilter.type).toBe("name");
});

test("should create a customer filter with email filter", ({ expect }) => {
  const customerFilter = new CustomerFilter("email", "xyz");
  expect(customerFilter.type).toBe("email");
});

test("should create a customer filter with phone filter", ({ expect }) => {
  const customerFilter = new CustomerFilter("phone", "xyz");
  expect(customerFilter.type).toBe("phone");
});

test("should create a customer filter with all filter", ({ expect }) => {
  const customerFilter = new CustomerFilter("all", "xyz");
  expect(customerFilter.type).toBe("all");
});
