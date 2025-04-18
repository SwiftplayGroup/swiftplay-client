"use client";

import { useEffect, useState } from "react"
import User from "~/api/User.ts";
import { Card, CardTitle } from "~/components/ui/card";
import styles from "./RunsCard.module.css";
import { Skeleton } from "~/components/ui/skeleton";
import Run from "~/api/Run";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export default function RunsCard({user}: {user: User}) {

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
                      <TableCell>{run.game.name}</TableCell>
                      <TableCell>{run.category?.name ?? "Default"}</TableCell>
                      <TableCell>{millisecondsToTime(run.time)}</TableCell>
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