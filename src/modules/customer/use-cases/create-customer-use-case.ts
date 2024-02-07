import { Customer } from "../entities/customer";
import { CustomerAlreadyExistsException } from "../exceptions/customer-already-exists";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerRepositoryPg } from "../repositories/customer-repository-pg";

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(customerData: Customer) {
    const customer = await this.customerRepository.findByEmail(
      customerData.email
    );

    if (customer) {
      throw new CustomerAlreadyExistsException();
    }

    return this.customerRepository.save(customerData);
  }
}

export class CreateCustomerUseCaseFactory {
  static create() {
    return new CreateCustomerUseCase(new CustomerRepositoryPg());
  }
}
