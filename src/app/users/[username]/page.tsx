"use client";
export const runtime = "edge";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import User from "~/api/User.ts";
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import ObjectId from "bson-objectid";
import { Skeleton } from "~/components/ui/skeleton";
import RunsCard from "~/app/users/[username]/profile-cards/RunsCard/RunsCard";
import FavoriteRunCard from "./profile-cards/FavoriteRunCard/FavoriteRunCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogHeader } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import PermissionDialog from "./dialogs/PermissionDialog";
import { PermissionAccessLevel } from "~/api/Permission";

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const { username } = useParams();

  useEffect(() => {
    (async () => {
      try {
        if (typeof username !== "string") {
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

  let shouldShowPermissionEditor = false;
  if (user?.permissionOverrides) {
    for (const permissionID of Object.keys(user.permissionOverrides)) {
      if (
        user.permissionOverrides[permissionID] >= PermissionAccessLevel.ADMIN
      ) {
        shouldShowPermissionEditor = true;
        break;
      }
    }
  }

  return (
    <div className="h-screen flex">
      <section id={styles.main}>
        <Card id={styles.userContainer} className={styles.container}>
          <section>
            <Avatar
              id={styles.profilePicture}
              className={!user ? styles.notFound : undefined}
            >
              <AvatarImage src={user?.avatarURL} />
            </Avatar>
            <section>
              {isLoading ? (
                <Skeleton className="h-6 w-[300px]" />
              ) : (
                <section id={styles.username}>
                  {user?.username ?? "User not found"}
                </section>
              )}
              {isLoading || !user ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                <section>
                  Joined on{" "}
                  {new Intl.DateTimeFormat("en-US").format(
                    new ObjectId(user._id).getTimestamp()
                  )}
                </section>
              )}
            </section>
          </section>
          {user ? (
            <section>
              <Dialog>
                <DialogTrigger asChild>
                  {/*This needs to be as child so that it doesnt have a button in a
                buttonn*/}
                  <Button> Change profile picture</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change profile picture</DialogTitle>
                    <DialogDescription>
                      Your profile picture is retrieved from Gravatar using your
                      email address. You can change it by using their website.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() =>
                          window.open("https://gravatar.com/", "_blank")
                        }
                      >
                        Go to Gravatar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Nevermind
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {shouldShowPermissionEditor ? (
                <PermissionDialog user={user} />
              ) : null}
            </section>
          ) : null}
        </Card>
        {user?.favoriteRunID ? (
          <FavoriteRunCard runID={user.favoriteRunID} />
        ) : null}
        {user ? <RunsCard user={user} /> : null}
      </section>
    </div>
  );
}
