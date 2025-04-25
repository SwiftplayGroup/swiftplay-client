"use client";

import { LoginForm } from "~/components/auth/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh bg-black bg-dot-white/[.2]  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
