"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateOrder } from "../mutation/use-create-order";
import { formOrderSchema, FormOrderSchema } from "./schema";
import { AddOrderProps } from "../types";
import { Spinner } from "@/components/ui/spinner";

export function AddOrder({ onOrderCreated }: AddOrderProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { createOrder, loading } = useCreateOrder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormOrderSchema>({
    resolver: zodResolver(formOrderSchema),
  });

  async function handleSendForm(data: FormOrderSchema) {
    const result = await createOrder(data);

    if (result.success) {
      reset();
      setIsOpenModal(false);
      onOrderCreated();
    } else {
      console.error("Erro ao criar comanda:", result.error);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <Dialog
        open={isOpenModal}
        onOpenChange={setIsOpenModal}
      >
        <DialogTrigger asChild>
          <Button>Abrir uma nova comanda</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir uma nova comanda</DialogTitle>
          </DialogHeader>

          <form
            className="space-y-4 mt-6"
            onSubmit={handleSubmit(handleSendForm)}
          >
            <div>
              <Label htmlFor="order-name">Nome da comanda</Label>
              <Input
                id="order-name"
                type="text"
                placeholder="Digite o nome da comanda"
                {...register("orderName")}
              />
              {errors.orderName && <p className="text-red-500 text-xs mt-1">{errors.orderName.message}</p>}
            </div>
            <div>
              <Label htmlFor="order-number">Número da comanda</Label>
              <Input
                id="order-number"
                type="text"
                placeholder="Digite o número da comanda"
                {...register("orderNumber")}
              />
              {errors.orderNumber && <p className="text-red-500 text-xs mt-1">{errors.orderNumber.message}</p>}
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 w-full">
              <Button
                type="submit"
                disabled={loading}
                className="min-w-24"
              >
                {loading ? <Spinner /> : "Adicionar"}
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
