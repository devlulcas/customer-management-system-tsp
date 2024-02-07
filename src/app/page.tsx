import { searchCustomerServerAction } from "@/modules/customer/presentation/actions/search-customer-server-action";
import { OptimalCustomerRouteVisualizationDialogTrigger } from "@/modules/customer/presentation/components/optimal-customer-route-visualization-dialog-trigger";
import { Button } from "@/modules/shared/presentation/components/ui/button";
import { transformNextJsSearchParams } from "@/modules/shared/presentation/lib/transform-nextjs-search-params";
import Image from "next/image";
import { Suspense } from "react";
import { SearchCustomerForm } from "../modules/customer/presentation/components/customer-search-form";
import { RegisterNewCustomerForm } from "../modules/customer/presentation/components/register-new-customer-form";
import mapSvg from "./map.svg";

type PageProps = {
  searchParams: Record<string, string | string[]>;
};

export default async function Page(props: PageProps) {
  const customerSearchResult = await searchCustomerServerAction(
    transformNextJsSearchParams(props.searchParams)
  );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-8 w-full lg:h-[--viewport-height] gap-1">
      <Suspense
        fallback={
          <div className="p-4 border flex gap-1 items-center w-full h-full rounded col-start-1 col-end-2 row-start-1 row-end-2">
            <h2 className="text-2xl font-bold h-full items-center flex justify-center w-full">
              Carregando caminho otimizado...
            </h2>
          </div>
        }
      >
        <OptimalCustomerRouteVisualizationDialogTrigger>
          <Button
            variant="ghost"
            className="p-4 border flex gap-1 items-center w-full h-full rounded col-start-1 col-end-2 row-start-1 row-end-2"
          >
            <Image src={mapSvg} alt="Mapa" className="h-1/2 w-fit max-h-16" />
            Ver rota mais otimizada
          </Button>
        </OptimalCustomerRouteVisualizationDialogTrigger>
      </Suspense>

      <div className="p-4 border w-full h-full rounded col-start-1 col-end-2 row-start-2 row-end-9">
        <h2 className="text-2xl font-bold mb-4">Cadastre um novo cliente</h2>
        <RegisterNewCustomerForm />
      </div>

      <div className="p-4 border w-full h-full rounded flex flex-col col-start-2 col-end-3 row-start-1 row-end-9">
        <h2 className="text-2xl font-bold mb-4">Clientes cadastrados</h2>
        <SearchCustomerForm
          inititalData={customerSearchResult}
          onSubmit={searchCustomerServerAction}
        />
      </div>
    </div>
  );
}
