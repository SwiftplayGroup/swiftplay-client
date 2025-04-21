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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import CategoryDeletionDialog from "../CategoryDeletionDialog/CategoryCreationDialog";

export default function GameRunsCard({game, setGame}: {game: Game, setGame: (game: Game) => void}) {

  const [isLoading, setIsLoading] = useState<boolean>(!!game);
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState<string>("default");

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

  const filteredRuns = runs.filter((run) => (!run.category && selectedCategoryID === "default") || (run.category?._id === selectedCategoryID));
  const selectedCategory = game.categories.find((category) => selectedCategoryID === category._id);

  return (
    <Card className={styles.container}>
      <CardTitle>Runs</CardTitle>
      <section id={styles.actions}>
        <Select value={selectedCategoryID} disabled={game.categories.length < 1} onValueChange={(newSelectedCategoryID) => setSelectedCategoryID(newSelectedCategoryID)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            {
              game.categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        {
          selectedCategory ? <CategoryDeletionDialog category={selectedCategory} onDelete={() => {
            
            setGame(new Game({...game, categories: game.categories.filter((category) => category._id !== selectedCategory._id)}));
            setSelectedCategoryID("default");
          
          }} /> : null
        }
      </section>
      {
        isLoading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          filteredRuns[0] ? (
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
                  filteredRuns.map((run, index) => (
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