"use client";

import { formatCurrency } from "@/lib/format-price";
import { ColumnDef } from "@tanstack/react-table";
import { ProductImage } from "@/components/product-image";
import { MenuItem } from "../types";

export const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "image",
    header: "Imagem",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const name = row.getValue("name") as string;

      return (
        <ProductImage
          src={image}
          alt={`Imagem do ${name}`}
          size={80}
        />
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
