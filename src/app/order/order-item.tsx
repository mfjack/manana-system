import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddOrder } from "./add-order";

type status = "Livre" | "Ocupado";

type Order = {
  id: number;
  status: status;
};

const orders: Order[] = [
  { id: 1, status: "Livre" },
  { id: 2, status: "Ocupado" },
  { id: 3, status: "Ocupado" },
  { id: 4, status: "Livre" },
  { id: 5, status: "Livre" },
  { id: 6, status: "Ocupado" },
  { id: 7, status: "Ocupado" },
  { id: 8, status: "Livre" },
  { id: 9, status: "Livre" },
  { id: 10, status: "Ocupado" },
  { id: 11, status: "Ocupado" },
  { id: 12, status: "Livre" },
  { id: 13, status: "Livre" },
  { id: 14, status: "Ocupado" },
  { id: 15, status: "Ocupado" },
  { id: 16, status: "Livre" },
  { id: 17, status: "Livre" },
  { id: 18, status: "Ocupado" },
  { id: 19, status: "Ocupado" },
  { id: 20, status: "Livre" },
];

export function OrderItem() {
  return (
    <section className="h-screen p-4 lg:p-6 flex flex-col overflow-y-auto">
      <AddOrder />
      <div className="flex flex-col gap-6 items-start sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card
              key={order.id}
              className={cn(
                "h-16 justify-center hover:transition-transform hover:scale-[1.02] cursor-pointer w-full rounded-sm shadow lg:h-24",
                order.status === "Ocupado" ? "bg-red-50" : "bg-emerald-50"
              )}
            >
              <CardContent className="flex justify-between">
                <h2 className="text-xl font-medium">{order.id}</h2>
                <Badge
                  className={cn("text-md rounded-sm", order.status === "Ocupado" ? "bg-red-500" : "bg-emerald-500")}
                >
                  {order.status}
                </Badge>
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
