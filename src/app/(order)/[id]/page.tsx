"use client";

import { notFound, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, Clock, Hash, Plus, User, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useGetOrderById } from "../query/use-get-order-by-id";
import { useGetOrderItems } from "../query/use-get-order-items";
import { useAddItemToOrder } from "../mutation/use-add-item-to-order";
import { useUpdateOrderItem } from "../mutation/use-update-order-item";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { useGetProduct } from "@/app/menu/query/use-get-product";
import { useMemo } from "react";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const { order, loading: orderLoading } = useGetOrderById(orderId);
  const { items, loading: itemsLoading } = useGetOrderItems(orderId);
  const { products } = useGetProduct();
  const { addItem, loading: addingItem } = useAddItemToOrder();
  const { removeItem, updateQuantity, loading: updatingItem } = useUpdateOrderItem();

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [items]);

  function handleAddProduct(productId: string) {
    addItem({
      orderId,
      productId,
      quantity: 1,
    });
  }

  function handleUpdateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    updateQuantity({
      orderId,
      itemId,
      quantity: newQuantity,
    });
  }

  function handleRemoveItem(itemId: string) {
    removeItem({
      orderId,
      itemId,
    });
  }

  if (orderLoading || itemsLoading) {
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
          <h1 className="text-xl lg:text-2xl font-bold">{order.orderName}</h1>
          <Badge className={cn("text-sm", order.status === "OCCUPIED" ? "bg-orange-500" : "bg-emerald-500")}>
            {STATUS_TRANSLATIONS[order.status]}
          </Badge>
        </div>
        <div className="flex items-center gap-4 mt-1 text-xs lg:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Hash className="h-4 w-4" />
            Comanda {order.orderNumber}
          </div>
          <div className="items-center gap-1 hidden lg:flex">
            <Clock className="h-4 w-4" />
            {new Date(order.createdAt).toLocaleString("pt-BR")}
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-6 flex w-full gap-4 flex-col lg:flex-row">
        <Card className="w-full overflow-y-auto lg:max-h-[80vh] max-h-[40vh] [&::-webkit-scrollbar]:hidden">
          <CardContent className="space-y-4 px-0 flex flex-col h-full justify-between">
            <div className="space-y-3 p-3 flex-1">
              {items.length > 0 ? (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border p-3 rounded space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-xs lg:text-base">{item.product.name}</h4>
                        <p className="text-muted-foreground text-xs lg:text-base">{formatPrice(item.unitPrice)} cada</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updatingItem}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="min-w-[2rem] text-center font-medium text-xs lg:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItem}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updatingItem}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="h-full flex justify-center items-center text-muted-foreground">
                  Nenhum item adicionado aos pedidos.
                </p>
              )}
            </div>

            {items.length > 0 && (
              <div className="flex items-center justify-between p-2 lg:p-4 bg-muted rounded rounded-t-none sticky bottom-0 w-full">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground text-xs lg:text-base">Total:</span>
                  <span className="text-xs lg:text-base font-bold text-emerald-500 ">{formatPrice(total)}</span>
                </div>
                <Button className="text-xs lg:text-base">Fechar conta</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full overflow-y-auto lg:max-h-[80vh] max-h-[40vh] [&::-webkit-scrollbar]:hidden">
          <CardContent className="space-y-3 p-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-3 rounded flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-xs lg:text-base">{product.name}</h4>
                  <p className="font-semibold text-muted-foreground text-xs lg:text-base">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleAddProduct(product.id)}
                  disabled={addingItem}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
