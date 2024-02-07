import { PaginatedResult } from "@/modules/shared/value-objects/paginated-result";
import { Pagination } from "@/modules/shared/value-objects/pagination";
import { Customer } from "../entities/customer";
import { CustomerFilter } from "../value-objects/customer-filter";

export interface CustomerRepository {
  findMany(
    filter: CustomerFilter,
    pagination: Pagination
  ): Promise<PaginatedResult<Customer>>;
  findByEmail(email: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
  update(customer: Partial<Customer>): Promise<void>;
}
