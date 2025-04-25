"use client";
import Thread from "@/api/Thread";
import { useEffect, useState } from "react";
import { ThreadCard } from "~/components/forums/threads/thread-card";

export default function Page() {
  const [threads, setThreads] = useState<any[]>([]);
  useEffect(() => {
    const fetchThreads = async () => {
      const data = await Thread.getAllThreads();
      if (data) {
        setThreads(data);
      } else {
        console.error("No threads found.");
      }
    };
    fetchThreads();
  }, []);
  return (
    <div className="h-screen px-24">
      <h1 className="text-4xl font-bold">Hottest Threads</h1>
      <p className="mt-4 text-lg">
        The talk of the town... or (more accurately) the world.
      </p>
      <section className="mt-8">
        <div className="mt-4 space-y-4">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <div key={thread._id} className="mb-4">
                <ThreadCard {...thread} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No threads available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
