"use client";
export const runtime = "edge";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import Game from "~/api/Game";
import { Skeleton } from "~/components/ui/skeleton";

export default function GamePage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { gameID } = useParams<{
    gameID: string;
  }>();
  const [game, setGame] = useState<Game | null>(null);
  const [canDeleteRun, setCanDeleteRun] = useState<boolean>(false);
  const [canVerifyRun, setCanVerifyRun] = useState<boolean>(false);
  const [canRemoveRun, setCanRemoveRun] = useState<boolean>(false);

  useEffect(() => {

    (async () => {

      try {

        const game = await Game.getFromID(gameID);
        setGame(game);

      } catch (error) {

        console.error(error);
        
      }

      setIsLoading(false);

    })();

  }, [gameID]);

  return (
    <main>
      <section id={styles.content}>
        <Card id={styles.gameMetadata} className={styles.container}>
          <section>
            {
              game?.coverArtURL ? <img src={game.coverArtURL} id={styles.coverArt} /> : <Skeleton id={styles.coverArt} />
            }
            <section>
              {
                !isLoading ? (
                  <section id={styles.gameName}>
                    {game?.name ?? "Game not found"}
                  </section>
                ) : <Skeleton className="h-6 w-[300px]" />
              }
              {
                !isLoading && game ? (
                  <section>
                    {game.publisherName ?? "Unknown publisher"}
                  </section>
                ) : (
                  <Skeleton className="h-4 w-[250px]" />
                )
              }
            </section>
          </section>
        </Card>
      </section>
    </main>
  )
}