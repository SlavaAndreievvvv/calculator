import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Розподілення витрат",
  description: "Додаток для розподілу витрат між друзями",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/svg/favicon.svg" type="image" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
