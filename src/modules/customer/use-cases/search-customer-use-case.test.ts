import { Pagination } from "@/modules/shared/value-objects/pagination";
import { describe, test, vi } from "vitest";
import { CustomerRepository } from "../repositories/customer-repository";
import { customerRepositoryMock } from "../repositories/customer-repository-mock";
import { SearchCustomerUseCase } from "./search-customer-use-case";

describe("SearchCustomerUseCase", () => {
  test("should return an array of customers with pagination when no query is provided", async ({
    expect,
  }) => {
    const customerRepository: CustomerRepository = {
      ...customerRepositoryMock,
      findMany: vi.fn().mockResolvedValue({
        data: [],
        pagination: new Pagination(1, 10),
      }),
    };

    const searchCustomerUseCase = new SearchCustomerUseCase(customerRepository);

    const result = await searchCustomerUseCase.execute();

    expect(result.data).toBeInstanceOf(Array);
  });
});
