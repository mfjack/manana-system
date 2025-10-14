import { FormOrderSchema } from "../components/schema";

export function useCreateOrder() {
  async function createOrder(data: FormOrderSchema) {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Erro ao criar comanda:", error);
      return { success: false, error: "Erro de conexão" };
    }
  }

  return { createOrder };
}
