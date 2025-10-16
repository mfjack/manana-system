import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddItemToOrderData = {
  orderId: string;
  productId: string;
  quantity?: number;
  notes?: string;
};

export function useAddItemToOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync: addItem, isPending: loading } = useMutation({
    mutationFn: async ({ orderId, productId, quantity = 1, notes }: AddItemToOrderData) => {
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar item");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order-items", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
    },
    onError: (error: Error) => {
      console.error("Erro ao adicionar item:", error.message);
    },
  });

  return {
    addItem,
    loading,
  };
}
