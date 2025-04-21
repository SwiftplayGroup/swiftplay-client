import { Thread } from "@/types/threads";
import { ThreadCard } from "@/components/forums/threads/thread-card";
import Link from "next/link";
import Forum from "@/api/forums";

export default async function ForumThreadsPage({
  params,
}: {
  params: Promise<{ forumID: string }>;
}) {
  const { forumID } = await params;
  try {
    const threads = await Forum.getThreads(forumID);
    if (threads.message) {
      return (
        <div className="h-[50rem] flex items-center justify-center">
          Issue with Token: {threads.message}
        </div>
      );
    }
    return (
      <div className="h-[50rem] pt-36">
        <div className="text-white ">
          {threads.map((thread: Thread) => (
            <Link href={`/threads/${thread._id}`} key={thread._id}>
              <div>
                <ThreadCard {...thread} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error: ", error);
    return (
      <div className="h-[50rem] flex items-center justify-center">
        <div className="text-red-500">
          Error loading forum threads. Please try again later.
        </div>
      </div>
    );
  }
}
