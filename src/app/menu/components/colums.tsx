"use client";

import { formatCurrency } from "@/lib/format-price";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type MenuItem = {
  id: string;
  image?: string;
  name: string;
  description: string;
  price: number;
};

export const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "image",
    header: "Imagem",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const name = row.getValue("name") as string;

      return (
        <div className="relative w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {image && image.trim() !== "" ? (
            <Image
              src={image}
              alt={`Imagem do ${name}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="text-gray-400 text-xs text-center px-2">Sem imagem</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const formatted = formatCurrency(row.getValue("price"));
      return formatted;
    },
  },
];
