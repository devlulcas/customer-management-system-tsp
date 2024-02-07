import { Toaster } from "@/modules/shared/presentation/components/ui/sonner";
import { cn } from "@/modules/shared/presentation/lib/utils";
import { UserCogIcon } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer Management System",
  description:
    "A customer management system for a fake company with a TSP solver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "min-h-svh")}>
        <header className="h-[--header-height] p-1">
          <Link
            href="/"
            className="rounded w-full h-full flex justify-between items-center bg-primary text-primary-foreground"
          >
            <h1 className="text-xl font-bold px-4 flex items-center gap-2">
              <UserCogIcon className="w-8 h-8" />
              Customer Management System
            </h1>
          </Link>
        </header>

        <div className="lg:h-[--viewport-height] bg-background text-foreground px-1 overflow-clip">
          {children}
        </div>

        <footer className="h-[--footer-height] p-1 z-10">
          <div className="flex justify-center items-center bg-primary text-primary-foreground h-full rounded">
            <Link href="https://lucasrego.tech">Lucas Alves Rego</Link>
          </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
