import { Pagination } from "@/modules/shared/value-objects/pagination";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerRepositoryPg } from "../repositories/customer-repository-pg";
import { CustomerFilter } from "../value-objects/customer-filter";

export class SearchCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query = "", type = "all", page = 1, pageSize = 50) {
    const filter = new CustomerFilter(type, query);
    const pagination = new Pagination(page, pageSize);
    return this.customerRepository.findMany(filter, pagination);
  }
}

export class SearchCustomerUseCaseFactory {
  static create() {
    return new SearchCustomerUseCase(new CustomerRepositoryPg());
  }
}
