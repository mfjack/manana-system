import { BookOpen, Clipboard, HandCoins } from "lucide-react";
// import Link from "next/link";
// import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

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

export function SidebarMenu() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className="bg-white flex items-center gap-2 border p-3 rounded justify-start h-12 "
              >
                <Link
                  className="flex items-center gap-2"
                  href={item.href}
                  aria-label={`Ir para ${item.label}`}
                  tabIndex={0}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
