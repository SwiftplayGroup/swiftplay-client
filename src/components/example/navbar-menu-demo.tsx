"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "~/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Authenticator from "../authenticator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() ?? null : null;
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authenticatorMode, setAuthenticatorMode] = useState<
    "signin" | "register"
  >("signin");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [accountID, setAccountID] = useState<string | null>(null);
  const [sessionID, setSessionID] = useState<string | null>(null);

  useEffect(() => {
    setSessionToken(getCookie("sessionToken"));
    setAccountID(getCookie("accountID"));
    setSessionID(getCookie("sessionID"));
  }, [isAuthenticating]);

  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (isSigningOut) {
        try {
          if (sessionID && sessionToken && accountID) {
            const response = await fetch(
              `https://speedrun-listings-server.onrender.com/account/sessions/${sessionID}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  token: sessionToken,
                  "account-id": accountID,
                },
                method: "DELETE",
              }
            );

            if (!response.ok) {
              const responseJSON = await response.json();
              throw new Error(responseJSON.message ?? "Unknown error.");
            }
          }
        } catch (error: unknown) {
          alert(error);
        }

        document.cookie = `accountID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `sessionToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `sessionID=}; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setSessionToken(null);
        setAccountID(null);
        setSessionID(null);
        setIsSigningOut(false);
      }
    })();
  }, [accountID, sessionID, sessionToken, isSigningOut]);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive} style={{ alignItems: "center" }}>
        <MenuItem setActive={setActive} active={active} item="Swiftplay">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Home</HoveredLink>
            <HoveredLink href="/about">About Us</HoveredLink>
            <HoveredLink href="/careers">Careers</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Players">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <HoveredLink href="/leaderboard">All players</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Speedruns">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/leaderboard">Leaderboard</HoveredLink>
            <HoveredLink href="/account">Personal</HoveredLink>
            <HoveredLink href="/account">Account</HoveredLink>
            <HoveredLink href="/search">Search</HoveredLink>
          </div>
        </MenuItem>
        {sessionToken ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink onClick={() => setIsSigningOut(true)}>
                    Sign out
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <HoveredLink href="/login">Sign in</HoveredLink>
        )}
      </Menu>
    </div>
  );
}
