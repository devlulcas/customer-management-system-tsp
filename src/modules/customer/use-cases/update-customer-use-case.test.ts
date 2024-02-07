import { Location } from "@/modules/customer/entities/location";
import { describe, test, vi } from "vitest";
import { Customer } from "../entities/customer";
import { CustomerIsNotRegisteredException } from "../exceptions/customer-is-not-registered";
import { CustomerRepository } from "../repositories/customer-repository";
import { customerRepositoryMock } from "../repositories/customer-repository-mock";
import { UpdateCustomerUseCase } from "./update-customer-use-case";

describe("UpdateCustomerUseCase", () => {
  test("should update a customer", async ({ expect }) => {
    const oldCustomer = new Customer(
      "John Doe",
      "doe@email.com",
      "123456789",
      new Location(10, 20)
    );

    const newCustomer = new Customer(
      "John Doe",
      "john@email.com",
      "123456789",
      new Location(10, 20)
    );

    const customerRepository: CustomerRepository = {
      ...customerRepositoryMock,
      findByEmail: async (email: string) => {
        return email === oldCustomer.email ? oldCustomer : null;
      },
      update: vi.fn().mockResolvedValue(newCustomer),
    };

    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    expect(
      await updateCustomerUseCase.execute(oldCustomer.email, newCustomer)
    ).toHaveProperty("email", newCustomer.email);
  });

  test("should throw exception when updated user email doesn't exists", async ({
    expect,
  }) => {
    const fakeCustomer = new Customer(
      "John Doe",
      "doe@email.com",
      "123456789",
      new Location(10, 20)
    );

    const customerRepository: CustomerRepository = {
      ...customerRepositoryMock,
      findByEmail: vi.fn().mockResolvedValue(null),
    };

    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    expect(async () => {
      await updateCustomerUseCase.execute(fakeCustomer.email, fakeCustomer);
    }).rejects.toThrowError(
      new CustomerIsNotRegisteredException(fakeCustomer.email)
    );
  });

  test("should throw exception when updated user email already exists", async ({
    expect,
  }) => {
    const oldCustomer = new Customer(
      "John Doe",
      "doe@email.com",
      "123456789",
      new Location(10, 20)
    );

    const newCustomer = { ...oldCustomer, email: "john@email.com" };
    const otherCustomer = { ...oldCustomer, email: "john@email.com" };

    const customerRepository: CustomerRepository = {
      ...customerRepositoryMock,
      findByEmail: async (email: string) => {
        const customerExists = [oldCustomer, otherCustomer].find(
          (customer) => customer.email === email
        );

        return customerExists ?? null;
      },
      update: vi.fn().mockResolvedValue(newCustomer),
    };

    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    expect(async () => {
      await updateCustomerUseCase.execute(oldCustomer.email, newCustomer);
    }).rejects.toThrowError();
  });
});
