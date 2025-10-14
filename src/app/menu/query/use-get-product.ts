import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "../types";

async function fetchProducts(): Promise<MenuItem[]> {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error(`Erro ao carregar produtos: ${response.status}`);
  }

  return response.json();
}

export function useGetProduct() {
  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { products, loading };
}
