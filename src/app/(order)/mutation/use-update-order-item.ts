import { useMutation, useQueryClient } from "@tanstack/react-query";

type RemoveItemFromOrderData = {
  orderId: string;
  itemId: string;
};

type UpdateItemQuantityData = {
  orderId: string;
  itemId: string;
  quantity: number;
};

export function useUpdateOrderItem() {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending: removingItem } = useMutation({
    mutationFn: async ({ orderId, itemId }: RemoveItemFromOrderData) => {
      const response = await fetch(`/api/orders/${orderId}/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao remover item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao remover item:", error.message);
    },
  });

  const { mutate: updateQuantity, isPending: updatingQuantity } = useMutation({
    mutationFn: async ({ orderId, itemId, quantity }: UpdateItemQuantityData) => {
      const response = await fetch(`/api/orders/${orderId}/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar item:", error.message);
    },
  });

  return {
    removeItem,
    updateQuantity,
    loading: removingItem || updatingQuantity,
  };
}
