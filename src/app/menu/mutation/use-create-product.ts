import { useState } from "react";

type CreateProductData = {
  name: string;
  description: string;
  price: number;
  image?: string | null;
};

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);

  async function createProduct(data: CreateProductData) {
    try {
      setLoading(true);
      const response = await fetch("api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch {
      return { success: false, error: "Erro de conexão" };
    } finally {
      setLoading(false);
    }
  }

  return { createProduct, loading };
}
