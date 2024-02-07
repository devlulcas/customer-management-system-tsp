import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/presentation/components/ui/dialog";
import { toast } from "sonner";
import { JSONSerializableCustomer } from "../../entities/customer";
import { updateCustomerServerAction } from "../actions/update-customer-server-action";
import { CustomerBaseForm, CustomerBaseFormValues } from "./customer-base-form";

type EditCustomerDialogTriggerProps = {
  customer: JSONSerializableCustomer;
  children: React.ReactNode;
};

export function EditCustomerDialogTrigger({
  customer,
  children,
}: EditCustomerDialogTriggerProps) {
  const handleSubmit = async (data: CustomerBaseFormValues) => {
    const result = await updateCustomerServerAction(data);

    if (result.kind === "ok") {
      toast.success("Usuário cadastrado com sucesso!");
    } else {
      toast.error(result.error);
    }

    return result;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário {customer.name}</DialogTitle>
        </DialogHeader>

        <CustomerBaseForm onSubmit={handleSubmit} defaultValues={customer} />
      </DialogContent>
    </Dialog>
  );
}
