import { useQuery } from "@tanstack/react-query";

type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
  };
};

export function useGetOrderItems(orderId: string) {
  const { data: items = [], isLoading: loading } = useQuery({
    queryKey: ["order-items", orderId],
    queryFn: async (): Promise<OrderItem[]> => {
      const response = await fetch(`/api/orders/${orderId}/items`);

      if (!response.ok) {
        throw new Error("Erro ao buscar itens do pedido");
      }

      return response.json();
    },
  });

  return {
    items,
    loading,
  };
}
