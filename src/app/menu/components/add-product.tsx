"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format-price";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormAddProduct, formAddProductSchema } from "./schema";

export function AddProduct() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormAddProduct>({
    resolver: zodResolver(formAddProductSchema),
  });

  function handleAddProduct(data: FormAddProduct) {
    console.log("Produto adicionado:", data);

    // Verificar se há arquivo selecionado
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      // Validar tamanho do arquivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB");
        return;
      }

      console.log("Arquivo selecionado:", file.name, file.type, file.size);
    }

    // Aqui você pode implementar a lógica para enviar os dados para sua API
    // incluindo o upload da imagem
    setIsOpenModal(false);
    reset();
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
              {...register("price")}
              onChange={(e) => setValue("price", formatCurrency(e.target.value))}
              value={watch("price") || ""}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="picture">Imagem</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              ref={fileInputRef}
            />
            {errors.picture && <p className="text-red-500 text-xs mt-1">{String(errors.picture.message)}</p>}
          </div>

          <div className="flex items-center justify-end gap-2 mt-6 w-full">
            <Button type="submit">Adicionar</Button>
            <DialogClose asChild>
              <Button
                variant="secondary"
                type="button"
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
