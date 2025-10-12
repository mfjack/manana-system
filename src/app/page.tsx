import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type status = "Livre" | "Ocupado";

type Order = {
  id: number;
  status: status;
};

const orders: Order[] = [
  { id: 1, status: "Livre" },
  { id: 2, status: "Ocupado" },
  { id: 3, status: "Ocupado" },
];

export default function OrderPage() {
  return (
    <section className="h-screen p-6 flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-6 items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {orders.map((order) => (
          <Card
            key={order.id}
            className={cn(
              "h-20 justify-center hover:transition-transform hover:scale-[1.02] cursor-pointer w-full rounded-sm shadow lg:h-24",
              order.status === "Ocupado" ? "bg-red-50" : "bg-emerald-50"
            )}
          >
            <CardContent className="flex justify-between">
              <h2 className="text-xl font-medium">{order.id}</h2>
              <Badge className={cn("text-md rounded-sm", order.status === "Ocupado" ? "bg-red-500" : "bg-emerald-500")}>
                {order.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
