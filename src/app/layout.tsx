import type { Metadata } from "next";
import "./globals.css";

import { Saira, Lobster } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/sidebar-menu";
import { SidebarHotspot } from "@/components/sidebar-hotspot";

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
          <SidebarProvider>
            <SidebarHotspot />
            <SidebarMenu />
            <div className="flex h-screen w-full overflow-hidden">
              <main
                className="flex-1 overflow-hidden"
                role="main"
                aria-label="Conteúdo principal"
              >
                <div className="px-4 pt-4 lg:hidden block">
                  <SidebarTrigger />
                </div>
                {children}
              </main>
              <Toaster />
            </div>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
