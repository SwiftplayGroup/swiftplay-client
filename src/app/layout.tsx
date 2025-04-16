import type { Metadata } from "next";
import "./globals.css";
import Navbar from "~/components/navigation/navbar-menu";

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
        <Navbar className="top-2" />
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          {children}
        </div>
      </body>
    </html>
  );
}
