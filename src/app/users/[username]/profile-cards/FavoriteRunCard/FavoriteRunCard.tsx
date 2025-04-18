"use client";

import { useEffect, useState } from "react"
import User from "~/api/User.ts";
import { Card, CardTitle } from "~/components/ui/card";
import styles from "./FavoriteRunCard.module.css";
import { Skeleton } from "~/components/ui/skeleton";
import Run from "~/api/Run";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export default function FavoriteRunCard({user}: {user: User}) {

  const [isLoading, setIsLoading] = useState<boolean>(!!user);
  const [favoriteRun, setFavoriteRun] = useState<Run | null>(null);

  useEffect(() => {

    (async () => {

      if (user) {

        try {

          

        } catch (error) {

          console.error(error);

        }

        setIsLoading(false);

      } else {

        setFavoriteRun(null);

      }

    })();

  }, [user]);

  function millisecondsToTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
  
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours;
    const ms = milliseconds % 1000;
  
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
  
    return formattedTime;
  }

  return (
    <Card className={styles.container}>
      <CardTitle>Favorite run</CardTitle>
      {
        isLoading || !user ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          !favoriteRun ? (
            <section id={styles.runDataContainer}>
              <iframe src="https://www.youtube.com/embed/NGV7yaVzxmo" id={styles.video} />
              <section>
                <Card className={styles.runData}>
                  <CardTitle>Game</CardTitle>
                  <section>
                    {/* {favoriteRun.game.name} */}
                    American Dad
                  </section>
                </Card>
                <Card className={styles.runData}>
                  <CardTitle>Category</CardTitle>
                  <section>
                    Glitchless
                  </section>
                </Card>
                <Card className={styles.runData}>
                  <CardTitle>Time</CardTitle>
                  <section>
                    00:00:18.240
                  </section>
                </Card>
              </section>
            </section>
          ) : <p>None yet...</p>
        )
      }
    </Card>
  )

}