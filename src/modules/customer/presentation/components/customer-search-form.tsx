"use client";

import { Button } from "@/modules/shared/presentation/components/ui/button";
import { Input } from "@/modules/shared/presentation/components/ui/input";
import { Label } from "@/modules/shared/presentation/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/modules/shared/presentation/components/ui/pagination";
import { ScrollArea } from "@/modules/shared/presentation/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/presentation/components/ui/select";
import { Result } from "@/modules/shared/types/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchCustomerData } from "../actions/search-customer-server-action";
import { CustomerListTable } from "./customer-list-table";

type RegisterNewCustomerFormProps = {
  inititalData: Result<SearchCustomerData>;
  onSubmit: (values: URLSearchParams) => Promise<Result<SearchCustomerData>>;
};

export function SearchCustomerForm({
  onSubmit,
  inititalData,
}: RegisterNewCustomerFormProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [type, setType] = useState(searchParams.get("type") ?? "all");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? "1"));
  const [result, setResult] =
    useState<Result<SearchCustomerData>>(inititalData);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set("search", search);
    searchParams.set("type", type);
    searchParams.set("page", page.toString());

    const result = await onSubmit(searchParams);
    setResult(result);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("search", debouncedSearch);
    searchParams.set("type", type);
    searchParams.set("page", page.toString());
    push("/?" + searchParams.toString());
  }, [debouncedSearch, page, push, type]);

  const createPagedHref = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", page.toString());
      return "/?" + newSearchParams.toString();
    },
    [searchParams]
  );

  // Generate array of pagination items. Min 1, max 5 items. Min value is 1. Max value is the last page.
  const paginationItems = useMemo(() => {
    const lastPage =
      result.kind === "ok" ? result.value.pagination.totalPages : 1;

    const minPage = Math.max(1, page - 2);
    const maxPage = Math.min(lastPage, minPage + 4);
    return Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);
  }, [page, result]);

  return (
    <div className="flex h-full flex-col">
      <form
        method="GET"
        onSubmit={handleSubmit}
        className="flex justify-between items-end gap-2"
      >
        <div className="space-y-2 w-full">
          <Label htmlFor="search">Pesquisa</Label>
          <Input
            id="search"
            name="search"
            placeholder="Fulano"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            name="type"
            value={type}
            onValueChange={(value) => setType(value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione um tipo de filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos de filtro</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="phone">Telefone</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Pesquisar</Button>
      </form>

      {result.kind === "ok" ? (
        <ScrollArea className="h-full">
          <CustomerListTable customers={result.value.customers} />

          <Pagination className="mb-[--footer-height]">
            <PaginationContent>
              {result.value.pagination.previousPage !== null && (
                <PaginationItem>
                  <PaginationPrevious
                    href={createPagedHref(result.value.pagination.previousPage)}
                  />
                </PaginationItem>
              )}

              {paginationItems.at(0) !== 1 && (
                <PaginationItem>
                  <PaginationLink
                    className="text-muted-foreground text-xs"
                    href={createPagedHref(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {paginationItems.map((item) => (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={createPagedHref(item)}
                    isActive={searchParams.get("page") === item.toString()}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {paginationItems.at(-1) !==
                result.value.pagination.totalPages && (
                <PaginationItem>
                  <PaginationLink
                    className="text-muted-foreground text-xs"
                    href={createPagedHref(result.value.pagination.totalPages)}
                  >
                    {result.value.pagination.totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {result.value.pagination.nextPage !== null && (
                <PaginationItem>
                  <PaginationNext
                    href={createPagedHref(result.value.pagination.nextPage)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </ScrollArea>
      ) : (
        <p className="text-destructive-foreground bg-destructive p-4 border border-destructive-foreground rounded-md">
          {result.error}
        </p>
      )}
    </div>
  );
}
