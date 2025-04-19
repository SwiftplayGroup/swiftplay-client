"use client";
export const runtime = "edge";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import Run from "~/api/Run";
import RunCard from "~/components/RunCard/RunCard";
import DeleteRunDialog from "./dialogs/DeleteRunDialog";
import Permission, { PermissionAccessLevel } from "~/api/Permission";
import VerifyRunDialog from "./dialogs/VerifyRunDialog";

export default function RunPage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { gameID, runID } = useParams<{
    runID: string;
    gameID: string;
  }>();
  const [run, setRun] = useState<Run | null>(null);
  const [canVerifyRun, setCanVerifyRun] = useState<boolean>(false);

  useEffect(() => {

    (async () => {

      try {

        const run = await Run.getFromID(runID);
        setRun(run);

        let canVerifyRun = false;
        if (Run.authenticatedUser) {

          const permissions = await Permission.find();
          const verifyPermission = permissions.find((permission) => permission.hierarchicalName === "games.runs.verify");
          canVerifyRun = verifyPermission ? (Run.authenticatedUser.getAccessLevel(verifyPermission) ?? 0) >= PermissionAccessLevel.USER : false;

        }
        
        setCanVerifyRun(canVerifyRun);

      } catch (error) {

        console.error(error);
        
      }

      setIsLoading(false);

    })();

  }, [runID]);

  const canDeleteRun = run?.owner._id === Run.authenticatedUser?._id;

  return (
    <section id={styles.main}>
      <RunCard run={run} isLoading={isLoading} />
      {
        run && canDeleteRun && canVerifyRun ? (
          <Card id={styles.options}>
            {
              canVerifyRun ? (
                <VerifyRunDialog run={run} setRun={(verifiedRun) => setRun(verifiedRun)} />
              ) : null
            }
            {
              canDeleteRun ? (
                <DeleteRunDialog run={run} />
              ) : null
            }
          </Card>
        ) : null
      }
    </section>
  )
}