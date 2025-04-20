"use client";

import { Card, CardTitle } from "~/components/ui/card";
import styles from "./RunCard.module.css";
import { Skeleton } from "~/components/ui/skeleton";
import Run from "~/api/Run";
import convertMillisecondsToTime from "~/lib/millisecondsToTime";
import Link from "next/link";

export default function RunCard({run, isLoading}: {run: Run | null, isLoading: boolean}) {

  return (
    <Card className={styles.container}>
      <section id={styles.runDataContainer}>
        {
          isLoading || !run ? (
            <Skeleton id={styles.video} />
          ) : (
            <iframe src={`https://www.youtube.com/embed/${run.youtubeWatchID}`} id={styles.video} />
          )
        }
        <section>
          <Card className={styles.runData}>
            <CardTitle>Game</CardTitle>
            <section>
              {
                isLoading || !run ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <Link href={`/games/${run.game._id}`}>
                    {run.game.name}
                  </Link>
                )
              }
            </section>
          </Card>
          <Card className={styles.runData}>
            <CardTitle>Category</CardTitle>
            <section>
              {
                isLoading || !run ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <Link href={`/games/${run.game._id}/categories/${run.category?._id ?? "default"}`}>
                    {run.category?.name ?? "Default"}
                  </Link>
                )
              }
            </section>
          </Card>
          <Card className={styles.runData}>
            <CardTitle>Time</CardTitle>
            <section>
              {
                isLoading || !run ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <Link href={`/games/${run.game._id}/runs/${run._id}`}>
                    {convertMillisecondsToTime(run.durationMilliseconds)}
                  </Link>
                )
              }
            </section>
          </Card>
          <Card className={`${styles.runData} ${styles.person}`}>
            <CardTitle>Submitter</CardTitle>
            <section>
              {
                isLoading || !run ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <Link href={`/users/${run.owner._id}`}>
                    {run.owner.username}
                  </Link>
                )
              }
            </section>
          </Card>
          <Card className={`${styles.runData} ${styles.person}`}>
            <CardTitle>Verification</CardTitle>
            <section>
              {
                isLoading || !run ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  run.verification ? (
                    <>
                      Verified by <Link href={`/users/${run.verification.owner.username}`}>{run.verification.owner.username}</Link>
                    </>
                  ) : "Pending"
                )
              }
            </section>
          </Card>
        </section>
      </section>
    </Card>
  )

}