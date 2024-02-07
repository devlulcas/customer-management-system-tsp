import { COMPANY_EMAIL } from "@/modules/company/constants/location";
import { JSONSerializableCustomer } from "@/modules/customer/entities/customer";
import { Button } from "@/modules/shared/presentation/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/shared/presentation/components/ui/table";
import { EditCustomerDialogTrigger } from "./edit-customer-dialog-trigger";

type CustomerListTableProps = {
  customers: JSONSerializableCustomer[];
};

export function CustomerListTable({ customers }: CustomerListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Nome</TableHead>
          <TableHead className="text-center">E-mail</TableHead>
          <TableHead className="text-center">Telefone</TableHead>
          <TableHead className="text-center">Coordenadas (x, y)</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-x-scroll">
        {customers.map((customer) => (
          <TableRow key={customer.email}>
            <TableCell className="text-center">{customer.name}</TableCell>
            <TableCell className="text-center">{customer.email}</TableCell>
            <TableCell className="text-center">{customer.phone}</TableCell>
            <TableCell className="text-center">
              {customer.location.x}, {customer.location.y}
            </TableCell>

            <TableCell className="text-center">
              <EditCustomerDialogTrigger customer={customer}>
                <Button
                  className="w-full"
                  disabled={customer.email === COMPANY_EMAIL}
                >
                  Editar
                </Button>
              </EditCustomerDialogTrigger>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
