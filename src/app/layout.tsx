"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import getCookie from "~/lib/getCookie";
import Header from "~/components/Header/Header";
import Session from "~/api/Session";
import Client from "~/api/Client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  
  useEffect(() => {

    (async () => {

      const sessionID = getCookie("sessionID");
      const token = getCookie("token");
      if (sessionID && token) {

        Client.session = new Session({_id: sessionID, token});

        try {

          const channel = new BroadcastChannel("authentication");
          channel.postMessage(null);

        } catch (error) {

          console.error(error);

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
