"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import getCookie from "@/lib/getCookie";
import User from "@/api/User";
import { Play } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Forums",
    href: "/forums",
    description: "Find, search, and create forums to share with the community.",
  },
  {
    title: "Trending",
    href: "/trending",
    description: "Discover the most popular and trending content on Swiftplay.",
  },
  {
    title: "Threads",
    href: "/threads/trending",
    description: "Find the latest threads and trending topics.",
  },
  {
    title: "For You Page",
    href: "/fyp",
    description: "Find content related to your interests and preferences.",
  },
  // Note that adding two more items will make the height
  // match that of the getting started section, making it cleaner
];

const runs: { title: string; href: string; description: string }[] = [
  {
    title: "Games",
    href: "/games",
    description: "Find, search, and create game catagories.",
  },
  {
    title: "Runs",
    href: "/runs",
    description: "Discover the most popular and trending content on Swiftplay.",
  },
  {
    title: "Trending Runs",
    href: "/runs/trending",
    description: "Find Runs that are making the most noise.",
  },
  {
    title: "Runs For You",
    href: "/runs/fyp",
    description:
      "Find runs that are related to your interests and preferences.",
  },
];
export function NavigationBar() {
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
    <div className="p-2 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 w-full border-b">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Left Side - Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Getting started
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Swiftplay
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Share, create, and compete, all in one place.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/about" title="About">
                    Learn about us and our mission.
                  </ListItem>
                  <ListItem href="/careers" title="Careers">
                    Find your place in our team.
                  </ListItem>
                  <ListItem
                    href="https://github.com/SwiftplayGroup"
                    title="Contribute"
                  >
                    We are open source! Come checkout our Github Organization.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Forums | Threads
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Competitions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {runs.map((run) => (
                    <ListItem key={run.title} title={run.title} href={run.href}>
                      {run.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="https://github.com/SwiftplayGroup"
                legacyBehavior
                passHref
              >
                <Button variant={"ghost"}>Documentation</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-2">
                Menu
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 ml-2 mt-2 p-0 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="grid">
                <div className="pl-4 pb-2 pt-4">
                  <h4 className="font-medium flex align-center items-middle leading-none gap-1">
                    Getting Started
                  </h4>
                  <div className="mt-2 grid">
                    <Link
                      href="/"
                      className="text-sm flex flex-row align-middle items-center gap-1 hover:bg-accent p-2 rounded-md"
                    >
                      <Play size="8" fill="white" />
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm flex flex-row align-middle items-center gap-1 hover:bg-accent p-2 rounded-md"
                    >
                      <Play size="8" fill="white" />
                      About
                    </Link>
                    <Link
                      href="/careers"
                      className="text-sm flex flex-row align-middle items-center gap-1 hover:bg-accent p-2 rounded-md"
                    >
                      <Play size="8" fill="white" />
                      Careers
                    </Link>
                    <Link
                      href="https://github.com/SwiftplayGroup"
                      className="text-sm hover:bg-accent p-2 rounded-md flex flex-row align-middle items-center gap-1"
                    >
                      <Play size="8" fill="white" />
                      Contribute
                    </Link>
                  </div>
                </div>
                <div className="pl-4 pb-2">
                  <h4 className="font-medium leading-none">Forums | Threads</h4>
                  <div className="mt-2 grid">
                    {components.map((component) => (
                      <Link
                        key={component.title}
                        href={component.href}
                        className="text-sm hover:bg-accent p-2 rounded-md flex flex-row align-middle items-center gap-1"
                      >
                        {" "}
                        <Play size="8" fill="white" />
                        {component.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pl-4 pb-2">
                  <h4 className="font-medium leading-none">Competitions</h4>
                  <div className="mt-2 grid">
                    {runs.map((run) => (
                      <Link
                        key={run.title}
                        href={run.href}
                        className="text-sm hover:bg-accent p-2 rounded-md flex flex-row align-middle items-center gap-1"
                      >
                        {" "}
                        <Play size="8" fill="white" />
                        {run.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    href="https://github.com/SwiftplayGroup"
                    className="hover:bg-accent rounded-md block p-2"
                  >
                    <h4 className="font-medium leading-none">Documentation </h4>
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center ml-4">
          {!isLoading && user ? (
            <Link href={`/users/${user.username}`} legacyBehavior passHref>
              <a>
                <Avatar>
                  <AvatarImage src={user.avatarURL} alt={user.username} />
                  <AvatarFallback>
                    {user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </a>
            </Link>
          ) : (
            <Link href="/login" legacyBehavior passHref>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
