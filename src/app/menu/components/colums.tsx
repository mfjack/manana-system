"use client";

import { formatCurrency } from "@/lib/format-price";
import { ColumnDef } from "@tanstack/react-table";
import { MenuItem } from "../types";

export const columns: ColumnDef<MenuItem>[] = [
  // {
  //   accessorKey: "image",
  //   header: "Imagem",
  //   cell: ({ row }) => {
  //     const image = row.getValue("image") as string;
  //     const name = row.getValue("name") as string;

  //     return (
  //       <Image
  //         src={image || "/no-image.png"}
  //         alt={`Imagem do ${name}`}
  //         width={80}
  //         height={80}
  //         className="rounded object-cover"
  //       />
  //     );
  //   },
  // },
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
