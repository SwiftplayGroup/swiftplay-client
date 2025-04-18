"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import User from "~/api/User";

export default function UserPage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const { username } = useParams()

  useEffect(() => {

    (async () => {

      try {

        if (typeof(username) !== "string") {

          throw new Error("User doesn't exist.");

        }

        const user = await User.getFromUsername(username);
        setUser(user);

      } catch (error) {

        console.error(error);

      }

      setIsLoading(false);

    })();

  }, [username]);

  if (isLoading) {

    return (
      <section>
        Please wait...
      </section>
    )

  } else if (user) {

    return (
      <section>
        {user.username}
      </section>
    )

  }

  return (
    <section>
      That user doesn't exist yet. :(
    </section>
  )

}