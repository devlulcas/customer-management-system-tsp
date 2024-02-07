import { COMPANY_AS_CUSTOMER } from "@/modules/company/constants/location";
import { Location } from "@/modules/customer/entities/location";
import { test, vi } from "vitest";
import { Customer } from "../entities/customer";
import { CustomerRepository } from "../repositories/customer-repository";
import { customerRepositoryMock } from "../repositories/customer-repository-mock";
import { FindOptimizedCustomerRouteUseCase } from "./find-optimized-customer-route-use-case";

test("should return the optimized route for visiting all customers and go back to the company", async ({
  expect,
}) => {
  const fakeCustomers = [
    new Customer("B", "A@mail.com", "11999999999", new Location(0, 1)),
    new Customer("C", "A@mail.com", "11999999999", new Location(1, 1)),
    new Customer("D", "A@mail.com", "11999999999", new Location(1, 0)),
  ];

  const customerRepository: CustomerRepository = {
    ...customerRepositoryMock,
    findAll: vi.fn().mockResolvedValue(fakeCustomers),
  };

  const findOptimizedCustomerRouteUseCase =
    new FindOptimizedCustomerRouteUseCase(customerRepository);

  const result = await findOptimizedCustomerRouteUseCase.execute();

  expect(result.route).toEqual([
    COMPANY_AS_CUSTOMER,
    fakeCustomers[1],
    fakeCustomers[2],
    fakeCustomers[3],
    COMPANY_AS_CUSTOMER,
  ]);

  expect(result.totalDistance).toBe(4);

  expect(customerRepository.findAll).toHaveBeenCalled();
});

test("should return zero distance when there is only the company", async ({
  expect,
}) => {
  const customerRepository: CustomerRepository = {
    ...customerRepositoryMock,
    findAll: vi.fn().mockResolvedValue([]),
  };

  const findOptimizedCustomerRouteUseCase =
    new FindOptimizedCustomerRouteUseCase(customerRepository);

  const result = await findOptimizedCustomerRouteUseCase.execute();

  expect(result.route).toEqual([COMPANY_AS_CUSTOMER, COMPANY_AS_CUSTOMER]);

  expect(result.totalDistance).toBe(0);
});
