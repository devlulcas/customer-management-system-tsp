"use server";

import {
  Customer,
  JSONSerializableCustomer,
} from "@/modules/customer/entities/customer";
import { SearchCustomerUseCaseFactory } from "@/modules/customer/use-cases/search-customer-use-case";
import { Result } from "@/modules/shared/types/utils";
import { JSONSerializablePagination } from "@/modules/shared/value-objects/paginated-result";

export type SearchCustomerData = {
  customers: JSONSerializableCustomer[];
  pagination: JSONSerializablePagination;
};

export async function searchCustomerServerAction(
  urlSearchParams: URLSearchParams
): Promise<Result<SearchCustomerData>> {
  const search = urlSearchParams.get("search") || "";
  const type = urlSearchParams.get("type") || "all";
  const page = urlSearchParams.get("page") || "1";
  const limit = urlSearchParams.get("limit") || "10";

  try {
    const customers = await SearchCustomerUseCaseFactory.create().execute(
      search,
      type,
      parseInt(page, 10),
      parseInt(limit, 10)
    );

    return {
      kind: "ok",
      value: {
        customers: customers.data.map(Customer.toJSONSerializable),
        pagination: customers.pagination,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        kind: "err",
        error: error.message,
      };
    }

    return {
      kind: "err",
      error: "Erro desconhecido ao buscar clientes",
    };
  }
}
