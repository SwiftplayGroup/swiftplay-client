"use client";
export const runtime = "edge";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import Game from "~/api/Game";
import { Skeleton } from "~/components/ui/skeleton";
import GameRunsCard from "./components/GameRunsCard/GameRunsCard";
import Client from "~/api/Client";
import RunSubmissionDialog from "./components/RunSubmissionDialog/RunSubmissionDialog";
import CategoryCreationDialog from "./components/CategoryCreationDialog/CategoryCreationDialog";
import GameApprovalDialog from "./components/GameApprovalDialog/GameApprovalDialog";
import CoverArtEditDialog from "./components/CoverArtEditDialog/CoverArtEditDialog";

export default function GamePage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { gameID } = useParams<{
    gameID: string;
  }>();
  const [game, setGame] = useState<Game | null>(null);

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

  const authenticatedUser = Client.session?.user;
  const canSubmitRun = true;

  return (
    <main>
      <section id={styles.content}>
        <Card id={styles.gameMetadata} className={styles.container}>
          <section>
            {
              game?.coverArtURL ? <img src={game.coverArtURL} id={styles.coverArt} /> : <Skeleton id={styles.coverArt} />
            }
            <section id={styles.gameTextData}>
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
            {
              authenticatedUser ? (
                <section id={styles.actionList}>
                  {
                    canSubmitRun && game ? (
                      <RunSubmissionDialog game={game} />
                    ) : null
                  }
                  {
                    game ? (
                      <CategoryCreationDialog game={game} setGame={setGame} />
                    ) : null
                  }
                  {
                    game ? (
                      <GameApprovalDialog game={game} setGame={setGame} />
                    ) : null
                  }
                  {
                    game ? (
                      <CoverArtEditDialog game={game} setGame={setGame} />
                    ) : null
                  }
                </section>
              ) : null
            }
          </section>
        </Card>
        {
          game ? <GameRunsCard game={game} setGame={setGame} /> : null
        }
      </section>
    </main>
  )
}