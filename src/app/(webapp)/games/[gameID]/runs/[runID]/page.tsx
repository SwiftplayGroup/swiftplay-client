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
import RemoveRunDialog from "./dialogs/RemoveRunDialog";

export default function RunPage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { runID } = useParams<{
    runID: string;
    gameID: string;
  }>();
  const [run, setRun] = useState<Run | null>(null);
  const [canDeleteRun, setCanDeleteRun] = useState<boolean>(false);
  const [canVerifyRun, setCanVerifyRun] = useState<boolean>(false);
  const [canRemoveRun, setCanRemoveRun] = useState<boolean>(false);

  useEffect(() => {

    (async () => {

      try {

        const run = await Run.getFromID(runID);
        setRun(run);

        let canVerifyRun = false;
        let canRemoveRun = false;
        let canDeleteRun = false;
        const authenticatedUser = await Run.session?.getUser();
        if (authenticatedUser) {

          const permissions = await Permission.find();
          const verifyPermission = permissions.find((permission) => permission.hierarchicalName === "games.runs.verify");
          canVerifyRun = verifyPermission ? (authenticatedUser.getAccessLevel(verifyPermission) ?? 0) >= PermissionAccessLevel.USER : false;
          
          const removePermission = permissions.find((permission) => permission.hierarchicalName === "games.runs.remove");
          canRemoveRun = removePermission ? (authenticatedUser.getAccessLevel(removePermission) ?? 0) >= PermissionAccessLevel.USER : false;

          canDeleteRun = run?.owner._id === authenticatedUser?._id

        }
        
        setCanDeleteRun(canDeleteRun);
        setCanVerifyRun(canVerifyRun);
        setCanRemoveRun(canRemoveRun);

      } catch (error) {

        console.error(error);
        
      }

      setIsLoading(false);

    })();

  }, [runID]);

  return (
    <main>
      <section id={styles.content}>
        <RunCard run={run} isLoading={isLoading} />
        {
          run && canDeleteRun && canVerifyRun ? (
            <Card id={styles.options}>
              {
                canVerifyRun ? (
                  <VerifyRunDialog run={run} setRun={(run) => setRun(run)} />
                ) : null
              }
              {
                canDeleteRun ? (
                  <DeleteRunDialog run={run} />
                ) : null
              }
              {
                canRemoveRun ? (
                  <RemoveRunDialog run={run} setRun={(run) => setRun(run)} />
                ) : null
              }
            </Card>
          ) : null
        }
      </section>
    </main>
  )
}