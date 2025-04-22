"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "~/lib/utils";
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
import getCookie from "~/lib/getCookie.ts";
import User from "~/api/User.ts";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    const userID = getCookie("userID");

    if (token && userID) {
      (async () => {
        try {
          const response = await fetch(
            `https://swiftplay.onrender.com/users/${userID}`,
            {
              headers: {
                "Content-Type": "application/json",
                token: token,
              },
            },
          );
          if (!response.ok) throw new Error("Failed to fetch user data");
          const userData = await response.json();
          setUser(new User(userData));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

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
        <MenuItem setActive={setActive} active={active} item="Speedruns">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/leaderboard">Leaderboard</HoveredLink>
            <HoveredLink href="/account">Personal</HoveredLink>
            <HoveredLink href="/account">Account</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Forums">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/forums">All Forums</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Games">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/games">All Games</HoveredLink>
          </div>
        </MenuItem>
        {!isLoading && user ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user.avatarURL || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[400px]">
                  <div className="flex flex-col space-y-2 p-4 w-full">
                    <NavigationMenuLink href={`/users/${user.username}`}>
                      Profile
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/account">
                      Account Settings
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/logout">
                      Sign Out
                    </NavigationMenuLink>
                  </div>
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
