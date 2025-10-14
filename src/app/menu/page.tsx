import { columns, MenuItem } from "./components/colums";
import { DataTable } from "./components/data-table";
import { AddProduct } from "./components/add-product";

const mockData: MenuItem[] = [
  {
    id: "1",
    picture: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop",
    name: "Café Espresso",
    description: "Café expresso tradicional, intenso e aromático",
    price: 4.5,
  },
  // {
  //   id: "2",
  //   picture: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
  //   name: "Croissant de Chocolate",
  //   description: "Croissant amanteigado com recheio de chocolate belga",
  //   price: 8.9,
  // },
  // {
  //   id: "3",
  //   picture: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop",
  //   name: "Bolo de Cenoura",
  //   description: "Fatia generosa de bolo de cenoura com cobertura de chocolate",
  //   price: 12.5,
  // },
  // {
  //   id: "4",
  //   picture: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop",
  //   name: "Cookie de Chocolate",
  //   description: "Cookie artesanal crocante com gotas de chocolate",
  //   price: 6.9,
  // },
  // {
  //   id: "5",
  //   picture: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop",
  //   name: "Cappuccino",
  //   description: "Café com leite vaporizado e espuma cremosa, polvilhado com canela",
  //   price: 7.5,
  // },
  // {
  //   id: "6",
  //   picture: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=300&fit=crop",
  //   name: "Muffin de Blueberry",
  //   description: "Muffin fofinho com blueberries frescos e açúcar cristal",
  //   price: 9.9,
  // },
  // {
  //   id: "7",
  //   picture: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop",
  //   name: "Latte Macchiato",
  //   description: "Café suave com leite vaporizado e toque de caramelo",
  //   price: 8.5,
  // },
  // {
  //   id: "8",
  //   picture: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop",
  //   name: "Torta de Maçã",
  //   description: "Fatia de torta caseira de maçã com canela e massa crocante",
  //   price: 14.9,
  // },
  // {
  //   id: "9",
  //   picture: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop",
  //   name: "Torta de Maçã",
  //   description: "Fatia de torta caseira de maçã com canela e massa crocante",
  //   price: 14.9,
  // },
  // {
  //   id: "10",
  //   picture: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop",
  //   name: "Torta de Maçã",
  //   description: "Fatia de torta caseira de maçã com canela e massa crocante",
  //   price: 14.9,
  // },
  // {
  //   id: "11",
  //   picture: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop",
  //   name: "Torta de Maçã",
  //   description: "Fatia de torta caseira de maçã com canela e massa crocante",
  //   price: 14.9,
  // },
];

export default function MenuPage() {
  return (
    <section className="h-screen p-4 lg:p-6 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Cardápio</h1>
        <AddProduct />
      </div>

      <DataTable
        columns={columns}
        data={mockData}
      />
    </section>
  );
}
