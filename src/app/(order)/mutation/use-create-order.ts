import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormOrderSchema } from "../components/schema";

async function createOrderApi(data: FormOrderSchema) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Erro ao criar comanda");
  }

  return result.data;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync: createOrder, isPending: loading } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { createOrder, loading };
}
