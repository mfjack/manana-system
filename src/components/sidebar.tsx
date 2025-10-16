import { BookOpen, Clipboard, HandCoins } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const menuItems = [
  {
    label: "PDV",
    href: "/pdv",
    icon: <HandCoins />,
  },
  {
    label: "Comanda",
    href: "/",
    icon: <Clipboard />,
  },
  {
    label: "Cardápio",
    href: "/menu",
    icon: <BookOpen />,
  },
];

export function Sidebar() {
  return (
    <section
      className="min-h-screen lg:p-4 p-2 border-r lg:w-64 flex flex-col justify-between"
      aria-label="Menu lateral"
      role="navigation"
    >
      <nav aria-label="Navegação principal">
        <h1 className="font-pacifico text-4xl text-center mb-4 hidden lg:block">Mañana</h1>
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                asChild
                variant="ghost"
                className="flex items-center gap-2 border p-3 rounded-sm w-fit justify-start h-10 lg:h-12 lg:w-full "
                aria-label={item.label}
                tabIndex={0}
              >
                <Link
                  href={item.href}
                  aria-label={`Ir para ${item.label}`}
                  tabIndex={0}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
