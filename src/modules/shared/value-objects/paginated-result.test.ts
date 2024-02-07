import { describe, test } from "vitest";
import { PaginatedResult } from "./paginated-result";
import { Pagination } from "./pagination";

test("should create a paginated result with data as empty array", ({
  expect,
}) => {
  const paginatedResult = new PaginatedResult([], new Pagination(1, 10), {
    totalItems: 0,
  });

  expect(paginatedResult.pagination).toEqual({
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    nextPage: null,
    previousPage: null,
  });
});

describe("should create a paginated result with 100 total items on ", () => {
  test("page 1 with limit 10 with null previous page", ({ expect }) => {
    const paginatedResult = new PaginatedResult(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      new Pagination(1, 10),
      { totalItems: 100 }
    );

    expect(paginatedResult.pagination).toEqual({
      page: 1,
      pageSize: 10,
      totalItems: 100,
      totalPages: 10,
      nextPage: 2,
      previousPage: null,
    });
  });

  test("page 2 with limit 10 with both a next page and a previous page", ({
    expect,
  }) => {
    const paginatedResult = new PaginatedResult(
      [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      new Pagination(2, 10),
      { totalItems: 100 }
    );

    expect(paginatedResult.pagination).toEqual({
      page: 2,
      pageSize: 10,
      totalItems: 100,
      totalPages: 10,
      nextPage: 3,
      previousPage: 1,
    });
  });

  test("page 10 with limit 10 with null next page", ({ expect }) => {
    const paginatedResult = new PaginatedResult(
      [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
      new Pagination(10, 10),
      { totalItems: 100 }
    );

    expect(paginatedResult.pagination).toEqual({
      page: 10,
      pageSize: 10,
      totalItems: 100,
      totalPages: 10,
      nextPage: null,
      previousPage: 9,
    });
  });
});
