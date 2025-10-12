import type { Metadata } from "next";
import "./styles/globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Mañana System",
  description: "Sistema de gerenciamento de pedidos de uma cafeteria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
