import type { Metadata } from "next";
import "./styles/globals.css";
import { Sidebar } from "@/components/sidebar";
import { Saira, Caveat } from "next/font/google";

const saira = Saira({ subsets: ["latin"] });
const pacifico = Caveat({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

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
      <body className={`${saira.className} ${pacifico.variable}`}>
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
