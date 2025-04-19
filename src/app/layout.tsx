"use client";

import "./globals.css";
import NavbarDemo from "~/components/aceternity/navbar-menu";
import { useEffect } from "react";
import Client from "~/api/Client";
import getCookie from "~/lib/getCookie";
import User from "~/api/User";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
    useEffect(() => {
  
      (async () => {
  
        Client.token = getCookie("token");
        Client.userID = getCookie("userID");
  
        try {
  
          if (Client.userID) {
  
            Client.authenticatedUser = await User.getFromID(Client.userID);
  
          }
  
        } catch (error) {
  
          console.error(error);
  
          Client.token = undefined;
          Client.userID = undefined;
  
        }
  
      })();
  
    }, []);

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close" />
      </head>
      <body>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
