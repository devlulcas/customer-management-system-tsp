"use client";

import { Button } from "@/modules/shared/presentation/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/shared/presentation/components/ui/form";
import { Input } from "@/modules/shared/presentation/components/ui/input";
import { Result } from "@/modules/shared/types/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { JSONSerializableCustomer } from "../../entities/customer";

export const customerBaseFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "O nome precisa ser um texto",
      required_error: "O nome é obrigatório",
    })
    .min(1, "O nome precisa ter no mínimo 1 caracteres"),
  email: z
    .string({
      invalid_type_error: "O email precisa ser um texto",
      required_error: "O email é obrigatório",
    })
    .email({ message: "O email precisa ser válido" }),
  phone: z
    .string({
      invalid_type_error: "O telefone precisa ser um texto",
      required_error: "O telefone é obrigatório",
    })
    .min(1, { message: "O telefone precisa ter no mínimo 1 caracteres" })
    .max(15, { message: "O telefone precisa ter no máximo 15 caracteres" })
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length > 0, {
      message: "O telefone é obrigatório",
    }),
  locationX: z.coerce
    .number({
      invalid_type_error: "A coordenada X precisa ser um número",
      required_error: "A coordenada X é obrigatória",
    })
    .int({ message: "A coordenada X precisa ser um número inteiro" }),
  locationY: z.coerce
    .number({
      invalid_type_error: "A coordenada Y precisa ser um número",
      required_error: "A coordenada Y é obrigatória",
    })
    .int({ message: "A coordenada Y precisa ser um número inteiro" }),
});

export type CustomerBaseFormValues = z.infer<typeof customerBaseFormSchema>;

type CustomerBaseFormProps = {
  onSubmit: (values: CustomerBaseFormValues) => Promise<Result<unknown>>;
  defaultValues?: JSONSerializableCustomer;
};

export function CustomerBaseForm({
  onSubmit,
  defaultValues,
}: CustomerBaseFormProps) {
  const form = useForm<CustomerBaseFormValues>({
    resolver: zodResolver(customerBaseFormSchema),
    defaultValues: {
      email: defaultValues?.email ?? "",
      locationX: defaultValues?.location?.x ?? 0,
      locationY: defaultValues?.location?.y ?? 0,
      name: defaultValues?.name ?? "",
      phone: defaultValues?.phone ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(
    async (values: CustomerBaseFormValues) => {
      const result = await onSubmit(values);

      if (result.kind === "ok") {
        form.reset();
        form.clearErrors();
      }
    }
  );

  return (
    <Form {...form}>
      <form method="POST" onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Fulano" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="fulano@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="12345" {...field} />
              </FormControl>
              <FormDescription>
                O telefone é fictício, mas precisa ser um número
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 items-start">
          <FormField
            control={form.control}
            name="locationX"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordenada X</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationY"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordenada Y</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Salvando" : "Salvar"} usuário
        </Button>
      </form>
    </Form>
  );
}
