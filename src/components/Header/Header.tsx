import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import styles from "./Header.module.css"
import User from "~/api/User"
import { Avatar, AvatarImage } from "~/components/ui/avatar"

export default function Header() {

  const router = useRouter();
  const [authenticatedUser, setAuthenticatedUser] = useState<User | undefined>(User.authenticatedUser);

  useEffect(() => {

    const authenticationChannel = new BroadcastChannel("authentication");

    function update() {

      setAuthenticatedUser(User.authenticatedUser);

    }

    authenticationChannel.addEventListener("message", update);

    return () => {

      authenticationChannel.removeEventListener("message", update);

    }

  }, []);

  return (
    <header id={styles.header}>
      <nav id={styles.left}>
        <Link href="/">
          <b>Swiftplay</b>
        </Link>
        <Link href="/games">
          Games
        </Link>
      </nav>
      <section>
        {
          authenticatedUser ? (
            <Link href={`/users/${authenticatedUser.username}`}>
              <Avatar>
                <AvatarImage src={authenticatedUser.avatarURL} />
              </Avatar>
            </Link>
          ) : (
            <Button type="button" onClick={() => router.push("/login")}>
              Sign in
            </Button>
          )
        }
      </section>
    </header>
  )

}