"use client";

import { notFound, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Clock, Hash, Plus, User } from "lucide-react";
import Link from "next/link";
import { useGetOrderById } from "../query/use-get-order-by-id";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { useGetProduct } from "@/app/menu/query/use-get-product";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const { order, loading } = useGetOrderById(orderId);
  const { products } = useGetProduct();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const STATUS_TRANSLATIONS = {
    FREE: "Livre",
    OCCUPIED: "Ocupada",
  } as const;

  if (!order) {
    return notFound();
  }

  return (
    <>
      <header className="border-b bg-white p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{order.orderName}</h1>
          <Badge className={cn("text-sm", order.status === "OCCUPIED" ? "bg-red-500" : "bg-emerald-500")}>
            {STATUS_TRANSLATIONS[order.status]}
          </Badge>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Hash className="h-4 w-4" />
            Comanda {order.orderNumber}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {new Date(order.createdAt).toLocaleString("pt-BR")}
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-6 min-h-screen">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="h-full">
            <CardContent className="space-y-4 px-0 flex flex-col h-full justify-between">
              <div className="space-y-3 p-3">
                {products.length > 0 ? (
                  <p>Itens da comanda</p>
                ) : (
                  <p className="text-center text-muted-foreground">Nenhum item adicionado.</p>
                )}
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded rounded-t-none ">
                <span className="font-medium text-muted-foreground">Total:</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm lg:text-2xl font-bold text-emerald-500">{formatPrice(order.total)}</span>
                  <Button>Fechar conta</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="space-y-3 p-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-3 rounded flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="font-semibold text-muted-foreground">{formatPrice(product.price)}</p>
                  </div>
                  <Button variant="outline">
                    <Plus />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
