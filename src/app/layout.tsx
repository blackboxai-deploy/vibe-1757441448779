import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Calculator",
  description: "A modern, responsive calculator with basic arithmetic operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}