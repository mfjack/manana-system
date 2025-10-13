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
    <section className="h-full p-4 border-r lg:w-64 flex flex-col justify-between">
      <nav>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                asChild
                variant="ghost"
                className="flex items-center gap-2 border p-3 rounded-sm w-fit justify-start h-10 lg:h-12 lg:w-full "
              >
                <Link href={item.href}>
                  <span>{item.icon}</span>
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
