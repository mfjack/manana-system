"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, parseCurrencyToNumber } from "@/lib/format-price";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormAddProduct, formAddProductSchema } from "./schema";
import { useCreateProduct } from "../mutation/use-create-product";

export function AddProduct() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { createProduct, loading } = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormAddProduct>({
    resolver: zodResolver(formAddProductSchema),
  });

  async function handleAddProduct(data: FormAddProduct) {
    try {
      await createProduct(data);
      reset();
      setIsOpenModal(false);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={setIsOpenModal}
    >
      <DialogTrigger asChild>
        <Button>Adicionar item ao cardápio</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar item ao cardápio</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 mt-6"
          onSubmit={handleSubmit(handleAddProduct)}
        >
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome do item"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Digite a descrição do item"
              {...register("description")}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="text"
              placeholder="R$ 0,00"
              {...register("price", {
                setValueAs: parseCurrencyToNumber,
                onChange: (e) => {
                  e.target.value = formatCurrency(e.target.value);
                },
              })}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="image">Imagem</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{String(errors.image.message)}</p>}
          </div>

          <div className="flex items-center justify-end gap-2 mt-6 w-full">
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Adicionando..." : "Adicionar"}
            </Button>
            <DialogClose asChild>
              <Button
                variant="secondary"
                type="button"
                disabled={loading}
              >
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
