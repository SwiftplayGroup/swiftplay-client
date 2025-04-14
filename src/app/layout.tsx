import type { Metadata } from "next";
import "./globals.css";
import NavbarDemo from "~/components/aceternity/navbar-menu";

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
