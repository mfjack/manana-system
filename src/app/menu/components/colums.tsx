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
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <span className="text-muted-foreground">{description}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const formatted = formatCurrency(row.getValue("price"));
      return <span className="text-green-500 font-medium">{formatted}</span>;
    },
  },
];
