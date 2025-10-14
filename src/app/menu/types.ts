import { ColumnDef } from "@tanstack/react-table";

export type MenuItem = {
  id: string;
  image?: string;
  name: string;
  description: string;
  price: number;
};

export type CreateProductData = {
  name: string;
  description: string;
  price: number;
  image?: string | null;
};

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};
