"use client";
import Thread from "@/api/Thread";
import Forum from "@/api/Forum";
import { useEffect, useState } from "react";
import { ThreadCard } from "~/components/forums/threads/thread-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TrendingPage() {
  const [trendingThreads, setTrendingThreads] = useState<Thread[]>([]);
  const [topForums, setTopForums] = useState<Forum[]>([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const [threads, forums] = await Promise.all([
          Thread.getAllThreads(),
          Forum.getAll(),
        ]);

        if (threads) {
          setTrendingThreads(threads.slice(0, 5));
        } else {
          console.error("No trending threads found.");
        }

        if (forums) {
          setTopForums(forums.slice(0, 5));
        } else {
          console.error("No forums found.");
        }
      } catch (err) {
        console.error("Error fetching trending data", err);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <div className="h-screen px-24">
      <h1 className="text-4xl font-bold">Trending</h1>
      <p className="mt-4 text-lg">The Latest in Gaming, in one place.</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">
          Trending Threads - What everyone is talking about.
        </h2>
        <div className="mt-4 space-y-4">
          {trendingThreads.length > 0 ? (
            trendingThreads.map((thread) => (
              <div key={thread._id} className="mb-4">
                <ThreadCard {...thread} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No trending threads available.
            </p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          Top Forums - Where everyone is at.
        </h2>
        <div className="mt-4 space-y-4">
          {topForums.length > 0 ? (
            topForums.map((forum) => (
              <div key={forum._id} className="mb-4">
                <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl hover:underline">
                      <Link href={`/forums/${forum._id}`} key={forum._id}>
                        {forum.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-400">
                    {forum.description}
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No forums available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
