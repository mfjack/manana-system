"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formOrderSchema = z.object({
  orderName: z.string().min(2, { message: "Digite o nome da comanda" }),
  orderNumber: z.string().min(1, { message: "Digite o número da comanda" }),
});

type FormOrderSchema = z.infer<typeof formOrderSchema>;

export function AddOrderButton() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormOrderSchema>({
    resolver: zodResolver(formOrderSchema),
  });

  function handleSendForm(data: FormOrderSchema) {
    console.log("Comanda criada com sucesso!", data);
    reset();
  }

  return (
    <div className="flex items-center justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Abrir comanda</Button>
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
              <Button type="submit">Adicionar</Button>
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
