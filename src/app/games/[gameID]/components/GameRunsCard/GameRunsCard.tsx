"use client";

import { useEffect, useState } from "react"
import { Card, CardTitle } from "~/components/ui/card";
import styles from "./GameRunsCard.module.css";
import { Skeleton } from "~/components/ui/skeleton";
import Run from "~/api/Run";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import Link from "next/link";
import convertMillisecondsToTime from "~/lib/millisecondsToTime";
import Game from "~/api/Game";

export default function GameRunsCard({game}: {game: Game}) {

  const [isLoading, setIsLoading] = useState<boolean>(!!game);
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {

    (async () => {

      if (game) {

        try {

          if (game) {

            const runs = await game.getRuns();
            runs.sort((run1, run2) => {

              if (run1.durationMilliseconds < run2.durationMilliseconds) {

                return -1;

              } else if (run1.durationMilliseconds > run2.durationMilliseconds) {

                return 1;

              }

              return 0;

            });
            
            setRuns(runs);

          }

        } catch (error) {

          console.error(error);

        }

        setIsLoading(false);

      }

    })();

  }, [game]);

  return (
    <Card className={styles.container}>
      <CardTitle>Runs</CardTitle>
      {
        isLoading || !game ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          runs[0] ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  runs.map((run, index) => (
                    <TableRow key={run._id}>
                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Link href={`/users/${run.owner.username}`}>
                          {run.owner.username}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/games/${run.game._id}/runs/${run._id}`}>
                          {convertMillisecondsToTime(run.durationMilliseconds)}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          ) : <p>None yet...</p>
        )
      }
    </Card>
  )

}