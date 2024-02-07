"use server";

import { Location } from "@/modules/customer/entities/location";
import { UpdateCustomerUseCaseFactory } from "@/modules/customer/use-cases/update-customer-use-case";
import { Result } from "@/modules/shared/types/utils";
import { revalidatePath } from "next/cache";
import { CustomerBaseFormValues } from "../components/customer-base-form";

export async function updateCustomerServerAction(
  data: Partial<CustomerBaseFormValues> & { email: string }
): Promise<Result<string>> {
  try {
    let location: Location | undefined;

    if (data.locationX && data.locationY) {
      location = new Location(data.locationX, data.locationY);
    }

    await UpdateCustomerUseCaseFactory.create().execute(data.email, {
      email: data.email,
      location: location,
      name: data.name,
      phone: data.phone,
    });

    revalidatePath("/*");
    revalidatePath("/api/v1/find-optimal-customer-route");

    return {
      kind: "ok",
      value: "Cliente atualizado com sucesso",
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
      error: "Erro desconhecido ao atualizar cliente",
    };
  }
}
