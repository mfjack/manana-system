import type { Metadata } from "next";
import "./styles/globals.css";
import { Sidebar } from "@/components/sidebar";
import { Saira, Caveat } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";

const saira = Saira({
  subsets: ["latin"],
});

const pacifico = Caveat({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mañana",
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
        <QueryProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
