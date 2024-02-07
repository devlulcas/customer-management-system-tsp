"use server";

import {
  Customer,
  JSONSerializableCustomer,
} from "@/modules/customer/entities/customer";
import { Location } from "@/modules/customer/entities/location";
import { CreateCustomerUseCaseFactory } from "@/modules/customer/use-cases/create-customer-use-case";
import { Result } from "@/modules/shared/types/utils";
import { revalidatePath } from "next/cache";
import { CustomerBaseFormValues } from "../components/customer-base-form";

export async function createCustomerServerAction(
  data: CustomerBaseFormValues
): Promise<Result<JSONSerializableCustomer>> {
  try {
    const location = new Location(data.locationX, data.locationY);

    const customer = new Customer(data.name, data.email, data.phone, location);

    const newCustomer = await CreateCustomerUseCaseFactory.create().execute(
      customer
    );

    revalidatePath("/*");
    revalidatePath("/api/v1/find-optimal-customer-route");

    return {
      kind: "ok",
      value: Customer.toJSONSerializable(newCustomer),
    };
  } catch (error) {
    console.error("Erro ao criar cliente", error);

    if (error instanceof Error) {
      return {
        kind: "err",
        error: error.message,
      };
    }

    return {
      kind: "err",
      error: "Erro desconhecido ao criar cliente",
    };
  }
}
