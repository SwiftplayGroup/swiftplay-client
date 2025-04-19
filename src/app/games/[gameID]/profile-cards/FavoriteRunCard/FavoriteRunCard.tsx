"use client";

import { useEffect, useState } from "react"
import { Card, CardTitle } from "~/components/ui/card";
import styles from "./FavoriteRunCard.module.css";
import { Skeleton } from "~/components/ui/skeleton";
import Run from "~/api/Run";
import convertMillisecondsToTime from "~/lib/millisecondsToTime";
import Link from "next/link";

export default function FavoriteRunCard({runID}: {runID: string}) {

  const [isLoading, setIsLoading] = useState<boolean>(!!runID);
  const [favoriteRun, setFavoriteRun] = useState<Run | null>(null);

  useEffect(() => {

    (async () => {

      if (runID) {

        try {

          const run = await Run.getFromID(runID);
          setFavoriteRun(run);

        } catch (error) {

          console.error(error);

        }

        setIsLoading(false);

      } else {

        setFavoriteRun(null);

      }

    })();

  }, [runID]);


  return (
    <Card className={styles.container}>
      <CardTitle>Favorite run</CardTitle>
      {
        isLoading || !favoriteRun ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          favoriteRun ? (
            <section id={styles.runDataContainer}>
              <iframe src={`https://www.youtube.com/embed/${favoriteRun.youtubeWatchID}`} id={styles.video} />
              <section>
                <Card className={styles.runData}>
                  <CardTitle>Game</CardTitle>
                  <section>
                    {favoriteRun.game.name}
                  </section>
                </Card>
                <Card className={styles.runData}>
                  <CardTitle>Category</CardTitle>
                  <section>
                    {favoriteRun.category?.name ?? "Default"}
                  </section>
                </Card>
                <Card className={styles.runData}>
                  <CardTitle>Time</CardTitle>
                  <section>
                    <Link href={`/games/${favoriteRun.game._id}/runs/${favoriteRun._id}`}>
                      {convertMillisecondsToTime(favoriteRun.durationMilliseconds)}
                    </Link>
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