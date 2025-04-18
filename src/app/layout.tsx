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
      <body>
        <NavbarDemo />
        {children}
      </body>
    </html>
  );
}
