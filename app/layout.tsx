import { Toaster } from "./_components/ui/sonner";
import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflow",
  description: "Efficient project management app for organizing tasks, tracking progress, and boosting productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
