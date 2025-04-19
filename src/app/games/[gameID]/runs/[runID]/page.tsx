"use client";
export const runtime = "edge";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import Run from "~/api/Run";
import RunCard from "~/components/RunCard/RunCard";
import DeleteRunDialog from "./dialogs/DeleteRunDialog";

export default function RunPage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { gameID, runID } = useParams<{
    runID: string;
    gameID: string;
  }>();
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {

    (async () => {

      try {

        const run = await Run.getFromID(runID);
        setRun(run);

      } catch (error) {

        console.error(error);
        
      }

      setIsLoading(false);

    })();

  }, [runID]);

  return (
    <section id={styles.main}>
      <RunCard run={run} isLoading={isLoading} />
      {
        run ? (
          run.owner._id === Run.authenticatedUser?._id ? (
            <Card>
              <DeleteRunDialog run={run} />
            </Card>
          ) : null
        ) : null
      }
    </section>
  )
}