import type { Metadata } from "next";
import "./styles/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
