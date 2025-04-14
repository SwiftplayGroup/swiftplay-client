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
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
            {children}
        </div>
      </body>
    </html>
  );
}
