import { test } from "vitest";
import { Pagination } from "./pagination";

test("should create a pagination object given page and limit", ({ expect }) => {
  const pagination = new Pagination(1, 10);
  expect(pagination).toEqual({ page: 1, pageSize: 10 });
});

test("should throw an error if page is less than 1", ({ expect }) => {
  expect(() => new Pagination(0, 10)).toThrowError(
    "A página deve ser maior que zero"
  );
});

test("should throw an error if pageSize is less than 1", ({ expect }) => {
  expect(() => new Pagination(1, 0)).toThrowError(
    "O tamanho da página deve ser maior que zero"
  );
});

test("should calculate offset", ({ expect }) => {
  const pagination = new Pagination(5, 10);
  expect(pagination.offset).toBe(40);
});
