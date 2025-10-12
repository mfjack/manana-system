import { BookOpen, Clipboard } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const menuItems = [
  {
    label: "Comanda",
    href: "/order",
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
    <section className="h-full p-3 border-r lg:w-64 flex flex-col justify-between">
      <nav>
        <ul className="flex flex-col gap-2 mt-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                asChild
                variant="ghost"
                className="flex items-center gap-2 border p-2 rounded-sm w-fit justify-start lg:h-12 lg:w-full "
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
