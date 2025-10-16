import { useQuery } from "@tanstack/react-query";

type Order = {
  id: string;
  orderName: string;
  orderNumber: string;
  status: "FREE" | "OCCUPIED";
  total: number;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
};

type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
  };
};

async function fetchOrderById(id: string): Promise<Order> {
  const response = await fetch(`/api/orders?id=${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao carregar comanda: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Erro ao carregar comanda");
  }

  return result.data;
}

export function useGetOrderById(id: string) {
  const {
    data: order,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id, // Só executa se tiver ID
    retry: false, // Não tenta novamente em caso de erro 404
  });

  return {
    order,
    loading,
    error: error?.message || null,
  };
}
