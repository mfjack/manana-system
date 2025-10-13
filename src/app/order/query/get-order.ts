import { Order } from "@prisma/client";
import { useEffect, useState } from "react";

export function useGetOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      setLoading(true);
      const response = await fetch("/api/orders");
      const result = await response.json();

      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function refreshOrders() {
    fetchOrders();
  }

  return { orders, loading, refreshOrders };
}
