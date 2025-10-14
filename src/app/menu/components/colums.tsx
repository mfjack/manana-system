"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type MenuItem = {
  id: string;
  picture?: string;
  name: string;
  description: string;
  price: number;
};

export const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "picture",
    header: "Imagem do Prato",
    cell: ({ row }) => {
      const picture = row.getValue("picture") as string;
      const name = row.getValue("name") as string;

      return (
        <div className="relative w-16 h-16 rounded overflow-hidden">
          <Image
            src={picture}
            alt={`Imagem do ${name}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome do Prato",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
      return formatted;
    },
  },
];
