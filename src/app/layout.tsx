import type { Metadata } from "next";
import "./styles/globals.css";
import { Sidebar } from "@/components/sidebar";
import { Saira, Lobster } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

const saira = Saira({
  subsets: ["latin"],
});

const pacifico = Lobster({
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
            <Toaster />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
