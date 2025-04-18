"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import User from "~/api/User.ts";
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import ObjectId from "bson-objectid";

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

  return (
    <section id={styles.main}>
      <Card id={styles.userContainer}>
        <Avatar id={styles.profilePicture}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {
          isLoading ? (
            <p>Please wait...</p>
          ) : (
            user ? (
              <section>
                <section id={styles.username}>
                  {user.username}
                </section>
                <section>
                  Joined on {new Intl.DateTimeFormat("en-US").format(new ObjectId().getTimestamp())}
                </section>
              </section>
            ) : null
          )
        }
      </Card>
    </section>
  )

}