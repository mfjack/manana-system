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
        <Button className="mt-6 lg:mt-0">Adicionar item ao cardápio</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar item ao cardápio</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 mt-6"
          onSubmit={handleSubmit(handleAddProduct)}
          aria-label="Formulário para adicionar item ao cardápio"
          role="form"
        >
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome do item"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Digite a descrição do item"
              aria-required="true"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              {...register("description")}
            />
            {errors.description && (
              <p
                id="description-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="text"
              placeholder="R$ 0,00"
              aria-required="true"
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? "price-error" : undefined}
              {...register("price", {
                setValueAs: parseCurrencyToNumber,
                onChange: (e) => {
                  e.target.value = formatCurrency(e.target.value);
                },
              })}
            />
            {errors.price && (
              <p
                id="price-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.price.message}
              </p>
            )}
          </div>

          {/* <div>
            <Label htmlFor="image">Imagem</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              aria-label="Selecione uma imagem para o produto"
              aria-describedby={errors.image ? "image-error" : undefined}
            />
            {errors.image && (
              <p
                id="image-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {String(errors.image.message)}
              </p>
            )}
          </div> */}

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
