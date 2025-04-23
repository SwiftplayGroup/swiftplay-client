// app/(webapp)/layout.tsx

import React from "react";
import { NavigationBar } from "@/components/navigation/navigation-bar";

export default function WebAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] pt-24">
        {children}
      </main>
    </div>
  );
}
