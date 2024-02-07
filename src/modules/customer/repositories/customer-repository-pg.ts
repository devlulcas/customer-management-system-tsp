import { Location } from "@/modules/customer/entities/location";
import { sql } from "@/modules/shared/infra/db";
import { PaginatedResult } from "@/modules/shared/value-objects/paginated-result";
import { Pagination } from "@/modules/shared/value-objects/pagination";
import { Customer } from "../entities/customer";
import { CustomerFilter } from "../value-objects/customer-filter";
import { CustomerRepository } from "./customer-repository";

export class CustomerRepositoryPg implements CustomerRepository {
  async findMany(
    filter: CustomerFilter,
    pagination: Pagination
  ): Promise<PaginatedResult<Customer>> {
    const getFilterString = (filter: CustomerFilter) => {
      switch (filter.type) {
        case "email":
          return sql`WHERE email ILIKE ${filter.query + "%"}`;
        case "name":
          return sql`WHERE name ILIKE ${filter.query + "%"}`;
        case "phone":
          return sql`WHERE phone ILIKE ${filter.query + "%"}`;
        default:
          if (filter.query === "") {
            return sql``;
          }

          return sql`WHERE search @@ to_tsquery('pg_catalog.portuguese', ${filter.query}) ORDER BY ts_rank_cd(search, to_tsquery('pg_catalog.portuguese', ${filter.query})) DESC`;
      }
    };

    let query = sql`SELECT name, email, phone, location_x, location_y, count(*) OVER() AS total_items FROM customer ${getFilterString(
      filter
    )} LIMIT ${pagination.pageSize} OFFSET ${
      (pagination.page - 1) * pagination.pageSize
    }`;

    const customers = await query;

    return new PaginatedResult(
      customers.map((customer: any) => {
        return new Customer(
          customer.name,
          customer.email,
          customer.phone,
          new Location(customer.location_x, customer.location_y)
        );
      }),
      pagination,
      { totalItems: parseInt(customers[0]?.total_items ?? "0", 10) }
    );
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customers =
      await sql`SELECT name, email, phone, location_x, location_y FROM customer WHERE email = ${email}`;

    if (customers.length === 0) {
      return null;
    }

    return new Customer(
      customers[0].name,
      customers[0].email,
      customers[0].phone,
      new Location(customers[0].location_x, customers[0].location_y)
    );
  }

  async findAll(): Promise<Customer[]> {
    const customers =
      await sql`SELECT name, email, phone, location_x, location_y FROM customer`;

    return customers.map((customer: any) => {
      return new Customer(
        customer.name,
        customer.email,
        customer.phone,
        new Location(customer.location_x, customer.location_y)
      );
    });
  }

  async save(customer: Customer): Promise<Customer> {
    await sql`INSERT INTO customer (name, email, phone, location_x, location_y, search) VALUES (${customer.name}, ${customer.email}, ${customer.phone}, ${customer.location.x}, ${customer.location.y}, to_tsvector('pg_catalog.portuguese', ${customer.name} || ' ' || ${customer.email} || ' ' || ${customer.phone}))`;
    return customer;
  }

  async update(customer: Customer): Promise<void> {
    await sql`UPDATE customer SET name = ${customer.name}, phone = ${customer.phone}, location_x = ${customer.location.x}, location_y = ${customer.location.y}, search = to_tsvector('pg_catalog.portuguese', ${customer.name} || ' ' || ${customer.email} || ' ' || ${customer.phone}) WHERE email = ${customer.email}`;
  }
}
