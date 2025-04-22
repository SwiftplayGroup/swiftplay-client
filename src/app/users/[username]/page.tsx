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

import RunsCard from "~/app/users/[username]/components/RunsCard/UserRunsCard";
import RunCard from "~/components/RunCard/RunCard";
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
import PermissionDialog from "./dialogs/PermissionDialog/PermissionDialog";
import { PermissionAccessLevel } from "~/api/Permission";
import Client from "~/api/Client";
import Run from "~/api/Run";

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const [favoriteRun, setFavoriteRun] = useState<Run | null>(null);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    (async () => {
      try {
        if (typeof username !== "string") {
          throw new Error("User doesn't exist.");
        }

        const user = await User.getFromUsername(username);
        setUser(user);

        if (user.favoriteRunID) {
          const run = await Run.getFromID(user.favoriteRunID);
          setFavoriteRun(run);
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    })();
  }, [username]);

  const [shouldShowPermissionEditor, setShouldShowPermissionEditor] =
    useState(false);
  const [canChangeProfilePhoto, setCanChangeProfilePhoto] = useState(false);

  useEffect(() => {
    async function updateAuthenticatedView() {
      let shouldShowPermissionEditor = false;
      const authenticatedUser = await User.session?.getUser();
      if (authenticatedUser?.permissionOverrides) {
        for (const permissionID of Object.keys(
          authenticatedUser.permissionOverrides
        )) {
          if (
            authenticatedUser.permissionOverrides[permissionID] >=
            PermissionAccessLevel.ADMIN
          ) {
            shouldShowPermissionEditor = true;
            break;
          }
        }
      }

      setShouldShowPermissionEditor(shouldShowPermissionEditor);

      const canChangeProfilePhoto = user
        ? authenticatedUser?._id === user._id
        : false;
      setCanChangeProfilePhoto(canChangeProfilePhoto);
    }

    const channel = new BroadcastChannel("authentication");
    channel.addEventListener("message", updateAuthenticatedView);
    updateAuthenticatedView();

    return () => {
      channel.removeEventListener("message", updateAuthenticatedView);
    };
  }, [user]);

  return (
    <main id={styles.main}>
      <section id={styles.content}>
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
          {user && (shouldShowPermissionEditor || canChangeProfilePhoto) ? (
            <section id={styles.actionList}>
              {canChangeProfilePhoto ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button">Change profile picture</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change profile picture</DialogTitle>
                      <DialogDescription>
                        Your profile picture is retrieved from Gravatar using
                        your email address. You can change it by using their
                        website.
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
              ) : null}
              {shouldShowPermissionEditor ? (
                <PermissionDialog
                  user={user}
                  setUser={(newUser) => setUser(newUser)}
                />
              ) : null}
              {canChangeProfilePhoto ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    if (Client.session) {
                      await Client.session.delete();
                    }

                    document.cookie =
                      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    document.cookie =
                      "sessionID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    Client.session = undefined;
                    const channel = new BroadcastChannel("authentication");
                    channel.postMessage(null);
                  }}
                >
                  Sign out
                </Button>
              ) : null}
            </section>
          ) : null}
        </Card>
        {user && favoriteRun ? (
          <RunCard run={favoriteRun} isLoading={isLoading} />
        ) : null}
        {user ? <RunsCard user={user} /> : null}
      </section>
    </main>
  );
}
