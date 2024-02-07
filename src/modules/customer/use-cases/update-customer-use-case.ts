import { Customer } from "../entities/customer";
import { CustomerAlreadyExistsException } from "../exceptions/customer-already-exists";
import { CustomerIsNotRegisteredException } from "../exceptions/customer-is-not-registered";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerRepositoryPg } from "../repositories/customer-repository-pg";

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(
    emailForIdentification: string,
    customerData: Partial<Customer>
  ) {
    const customer = await this.customerRepository.findByEmail(
      emailForIdentification
    );

    if (!customer) {
      throw new CustomerIsNotRegisteredException(emailForIdentification);
    }

    if (customerData.email && customerData.email !== customer.email) {
      const customerWithEmail = await this.customerRepository.findByEmail(
        customerData.email
      );

      if (customerWithEmail) {
        throw new CustomerAlreadyExistsException();
      }
    }

    return this.customerRepository.update(customerData);
  }
}

export class UpdateCustomerUseCaseFactory {
  static create() {
    return new UpdateCustomerUseCase(new CustomerRepositoryPg());
  }
}
