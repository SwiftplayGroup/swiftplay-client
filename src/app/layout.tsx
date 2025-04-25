"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import getCookie from "~/lib/getCookie";
import Session from "~/api/Session";
import Client from "~/api/Client";
import { NavigationBar } from "~/components/navigation/navigation-bar";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

// Metadata needs to be in a separate layout file since this is a client component
// The head tag includes the title and description instead

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const sessionID = getCookie("sessionID");
      const token = getCookie("token");
      if (sessionID && token) {
        Client.session = new Session({ _id: sessionID, token });

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
        <title>Swiftplay - Share, create, and compete</title>
        <meta
          name="description"
          content="Share, create, and compete, all in one place."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NavigationBar />
          <div>{isAuthenticating ? null : children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
