"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import Client from "~/api/Client";
import getCookie from "~/lib/getCookie";
import User from "~/api/User";
import Header from "~/components/Header/Header";
import Session from "~/api/Session";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  
  useEffect(() => {

    (async () => {

      const token = getCookie("token");
      const userID = getCookie("userID");
      const sessionID = getCookie("sessionID");
      
      if (token && userID && sessionID) {

        Client.session = new Session({token, userID, _id: sessionID, expirationDate: new Date()}); // TODO: Fix this with JWT

        try {

          Client.authenticatedUser = await User.getFromID(Client.session.userID);
          const channel = new BroadcastChannel("authentication");
          channel.postMessage(null);

        } catch (error) {

          console.error(error);

          Client.token = undefined;
          Client.userID = undefined;

        }

      }

      setIsAuthenticating(false);

    })();

  }, []);

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close" />
      </head>
      <body>
        {
          !isAuthenticating ? (
            <>
              <Header />
              {children}
            </>
          ) : null
        }
      </body>
    </html>
  );
}
