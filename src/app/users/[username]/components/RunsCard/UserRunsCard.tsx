"use client";

import { useEffect, useState } from "react"
import User from "~/api/User.ts";
import { Card, CardTitle } from "~/components/ui/card";
import styles from "./UserRunsCard.module.css";
import { Skeleton } from "~/components/ui/skeleton";
import Run from "~/api/Run";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import Link from "next/link";
import convertMillisecondsToTime from "~/lib/millisecondsToTime";
import Game from "~/api/Game";

export default function UserRunsCard({user}: {user?: User, game?: Game}) {

  const [isLoading, setIsLoading] = useState<boolean>(!!user);
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {

    (async () => {

      if (user) {

        try {

          const runs = await user.getRuns();
          setRuns(runs);

        } catch (error) {

          console.error(error);

        }

        setIsLoading(false);

      }

    })();

  }, [user]);

  return (
    <Card className={styles.container}>
      <CardTitle>Runs</CardTitle>
      {
        isLoading || !user ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          runs[0] ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  runs.map((run) => (
                    <TableRow key={run._id}>
                      <TableCell>
                        <Link href={`/games/${run.game._id}/runs/${run._id}`}>{run.game.name}</Link>
                      </TableCell>
                      <TableCell>{run.category?.name ?? "Default"}</TableCell>
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