"use client";
export const runtime = "edge";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import User from "~/api/User.ts";
import { Card, CardTitle } from "~/components/ui/card";
import styles from "./styles.module.css";
import ObjectId from "bson-objectid";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";
import RunsCard from "~/components/RunsCard/RunsCard";

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
      <Card id={styles.userContainer} className={styles.container}>
        <Avatar id={styles.profilePicture} className={!user ? styles.notFound : undefined}>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <section>
          {
            isLoading ? <Skeleton className="h-6 w-[300px]" /> : (
              <section id={styles.username}>
                {user?.username ?? "User not found"}
              </section>
            )
          }
          {
            isLoading || !user ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <section>
                Joined on {new Intl.DateTimeFormat("en-US").format(new ObjectId(user._id).getTimestamp())}
              </section>
            )
          }
        </section>
      </Card>
      {
        user ? <RunsCard user={user} /> : null
      }
    </section>
  )

}