import { cn } from "~/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Session from "~/api/Session";
import { useAuth } from "@/context/auth-context";
import User from "@/api/User";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const session = await login(username, password);
      Session.createSession({ username, password });
      console.log(session);
      // Store session data in cookies
      document.cookie = `userID=${
        session.userID
      }; SameSite=Strict; Secure; Path=/; Expires=${new Date(
        session.expirationDate,
      )}`;
      document.cookie = `token=${
        session.token
      }; SameSite=Strict; Secure; Path=/; Expires=${new Date(
        session.expirationDate,
      )}`;
      document.cookie = `sessionID=${
        session._id
      }; SameSite=Strict; Secure; Path=/; Expires=${new Date(
        session.expirationDate,
      )}`;

      // Get user and update auth context
      try {
        const currentUser = await User.getFromToken(session.token);
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-black">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="itsAidenJai"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
              )}
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
