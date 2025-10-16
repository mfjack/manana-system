"use client";

import { columns } from "./components/colums";
import { DataTable } from "./components/data-table";
import { AddProduct } from "./components/add-product";
import { useGetProduct } from "./query/use-get-product";
import { Spinner } from "@/components/ui/spinner";

export default function MenuPage() {
  const { products, loading } = useGetProduct();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section
      className="h-screen p-4 lg:p-6 flex flex-col overflow-y-auto"
      aria-label="Página do cardápio"
    >
      <div className="flex items-start lg:justify-between flex-col lg:flex-row">
        <h1 className="text-2xl font-medium">Cardápio</h1>
        <AddProduct />
      </div>

      <DataTable
        columns={columns}
        data={products}
      />
    </section>
  );
}
