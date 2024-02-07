import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/presentation/components/ui/dialog";
import { ScrollArea } from "@/modules/shared/presentation/components/ui/scroll-area";
import { Result } from "@/modules/shared/types/utils";
import { JSONSerializableCustomer } from "../../entities/customer";
import { VirtualizedCustomerList } from "./virtualized-customer-list";

type OptimalCustomerRouteVisualizationDialogTriggerProps = {
  children: React.ReactNode;
};

async function getOptimalPath(): Promise<
  Result<{ customers: JSONSerializableCustomer[]; distance: number }>
> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/v1/find-optimal-customer-route"
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return { kind: "ok", value: data };
  } catch (error) {
    if (error instanceof Error) {
      return { kind: "err", error: error.message };
    }

    return { kind: "err", error: "Erro desconhecido" };
  }
}

export async function OptimalCustomerRouteVisualizationDialogTrigger({
  children,
}: OptimalCustomerRouteVisualizationDialogTriggerProps) {
  const optimalPath = await getOptimalPath();

  if (optimalPath.kind === "err") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erro ao buscar rota</DialogTitle>
            <DialogDescription>{optimalPath.error}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[75dvw]">
        <DialogHeader>
          <DialogTitle>Rota mais eficiente</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80dvh]">
          <VirtualizedCustomerList customers={optimalPath.value.customers} />

          <footer className="border p-4 rounded mt-2">
            Distância total: {optimalPath.value.distance}
          </footer>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
