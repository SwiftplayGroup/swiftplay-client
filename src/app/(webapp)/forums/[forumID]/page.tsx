import { Thread } from "@/types/threads";
import { ThreadCard } from "@/components/forums/threads/thread-card";
import Forum from "@/api/Forum";
import { PostToForumButton } from "~/components/forums/threads/post-to-forum-button";

export default async function ForumThreadsPage({
  params,
}: {
  params: Promise<{ forumID: string }>;
}) {
  const { forumID } = await params;
  const forum = await Forum.getFromID(forumID);
  try {
    const threads = await Forum.getThreads(forumID);
    return (
      <div className="h-screen mx-auto px-4 md:px-6 space-y-4">
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md w-full px-4 py-3 border-b border-zinc-700">
          <h1 className="text-lg font-semibold">{forum.name}</h1>
          <p className="text-sm text-gray-500">{forum.description}</p>
        </header>
        <div className="flex justify-center">
          <PostToForumButton forumID={forumID} />
        </div>
        <div className="space-y-4 mx-auto">
          {threads.map((thread: Thread) => (
            <div key={thread._id} className="mb-4">
              <ThreadCard {...thread} />
            </div>
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
