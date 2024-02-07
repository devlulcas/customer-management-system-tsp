"use client";

import { toast } from "sonner";
import { createCustomerServerAction } from "../actions/create-customer-server-action";
import { CustomerBaseForm, CustomerBaseFormValues } from "./customer-base-form";

export function RegisterNewCustomerForm() {
  const handleSubmit = async (data: CustomerBaseFormValues) => {
    const result = await createCustomerServerAction(data);

    if (result.kind === "ok") {
      toast.success("Usuário cadastrado com sucesso!");
    } else {
      toast.error(result.error);
    }

    return result;
  };

  return <CustomerBaseForm onSubmit={handleSubmit} />;
}
