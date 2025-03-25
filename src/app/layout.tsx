import type { Metadata } from "next";
import "./globals.css";
import NavbarDemo from "~/components/example/navbar-menu-demo";

export const metadata: Metadata = {
  title: "Script",
  description: "Development server for Script Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
