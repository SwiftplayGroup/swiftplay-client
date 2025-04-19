"use client";
export const runtime = "edge";

import { useParams } from "next/navigation";
import { useState } from "react"
import { Card } from "~/components/ui/card";
import styles from "./styles.module.css";
import Run from "~/api/Run";
import RunCard from "~/components/RunCard/RunCard";

export default function RunPage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { gameID, runID } = useParams<{
    runID: string;
    gameID: string;
  }>()

  return (
    <section id={styles.main}>
      <RunCard runID={runID} />
    </section>
  )

}