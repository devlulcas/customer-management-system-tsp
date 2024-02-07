import { Location } from "@/modules/customer/entities/location";
import { describe, test, vi } from "vitest";
import { Customer } from "../entities/customer";
import { CustomerAlreadyExistsException } from "../exceptions/customer-already-exists";
import { CustomerRepository } from "../repositories/customer-repository";
import { customerRepositoryMock } from "../repositories/customer-repository-mock";
import { CreateCustomerUseCase } from "./create-customer-use-case";

describe("CreateCustomerUseCase", () => {
  test("should create a customer", async ({ expect }) => {
    const fakeCustomer = new Customer(
      "John Doe",
      "doe@mail.com",
      "123456789",
      new Location(10, 20)
    );

    const customerRepository: CustomerRepository = {
      ...customerRepositoryMock,
      findByEmail: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockResolvedValue({ email: fakeCustomer.email }),
    };

    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const newCustomer = await createCustomerUseCase.execute(fakeCustomer);

    expect(newCustomer).toHaveProperty("email", fakeCustomer.email);
  });

  test("should throw exception when current email is already being used", async ({
    expect,
  }) => {
    const fakeCustomer = new Customer(
      "John Doe",
      "doe@mail.com",
      "123456789",
      new Location(10, 20)
    );

    const customerRepository: CustomerRepository = {
      ...customerRepositoryMock,
      findByEmail: vi.fn().mockResolvedValue(fakeCustomer),
    };

    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    expect(() => {
      return createCustomerUseCase.execute(fakeCustomer);
    }).rejects.toThrowError(new CustomerAlreadyExistsException());
  });
});
