import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProductData } from "../types";

async function createProductApi(data: CreateProductData) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Erro ao criar produto");
  }

  return result.data;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutateAsync: createProduct, isPending: loading } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { createProduct, loading };
}
