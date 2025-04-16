"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "~/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
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
        <HoveredLink href="/login">Sign in</HoveredLink>
      </Menu>
    </div>
  );
}
