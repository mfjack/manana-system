import { Order } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function fetchOrders(): Promise<Order[]> {
  const response = await fetch("/api/orders");
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Erro ao carregar comandas");
  }

  return result.data;
}

export function useGetOrders() {
  const {
    data: orders = [],
    isLoading: loading,
    refetch: refreshOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return { orders, loading, refreshOrders };
}
