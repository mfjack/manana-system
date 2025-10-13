"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddOrder } from "./components/add-order";
import { useGetOrders } from "./query/get-order";
import { Spinner } from "@/components/ui/spinner";
import { OrderStatus } from "@prisma/client";

export function OrderItem() {
  const STATUS_TRANSLATIONS = {
    FREE: "Livre",
    OCCUPIED: "Ocupada",
  } as const;

  const { orders, loading, refreshOrders } = useGetOrders();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="h-screen p-4 lg:p-6 flex flex-col overflow-y-auto">
      <AddOrder onOrderCreated={refreshOrders} />
      <div className="flex flex-col gap-6 items-start sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card
              key={order.id}
              className={cn(
                "justify-center hover:transition-transform hover:scale-[1.02] cursor-pointer w-full rounded-sm shadow h-24",
                order.status === OrderStatus.OCCUPIED ? "bg-red-50" : "bg-emerald-50"
              )}
            >
              <CardContent className="flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">{order.orderNumber}</h2>
                  <Badge
                    className={cn(
                      "text-md rounded-sm",
                      order.status === OrderStatus.OCCUPIED ? "bg-red-500" : "bg-emerald-500"
                    )}
                  >
                    {STATUS_TRANSLATIONS[order.status as keyof typeof STATUS_TRANSLATIONS]}
                  </Badge>
                </div>
                <h3 className="text-md font-medium mt-2 text-muted-foreground">{order.orderName}</h3>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-lg text-nowrap">Nenhuma comanda em aberto</p>
        )}
      </div>
    </section>
  );
}
