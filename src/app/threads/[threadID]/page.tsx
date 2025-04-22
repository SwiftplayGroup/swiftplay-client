import { PostCard } from "@/components/forums/posts/post-card";
import { ThreadCard } from "@/components/forums/threads/thread-card";
import Thread from "@/api/threads";
import { Post } from "@/types/posts";
import { PostToThreadButton } from "@/components/forums/posts/post-to-thread-button";

export default async function ForumPage({
  params,
}: {
  params: Promise<{ threadID: string }>;
}) {
  const { threadID } = await params;

  try {
    const thread = await Thread.getFromID(threadID);
    const replies = await Thread.getReplies(threadID);

    return (
      <main className="min-h-screen pt-36 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Thread Header */}
          <ThreadCard {...thread} />

          {/* Post Reply Button */}
          <div className="flex justify-end">
            <PostToThreadButton
              threadID={thread._id}
              forumID={thread.forumID}
            />
          </div>

          {/* Replies */}
          <div className="p-4 max-h-[40rem] overflow-y-auto space-y-4">
            {replies.length > 0 ? (
              replies.map((reply: Post) => (
                <div key={reply._id}>
                  <PostCard {...reply} />
                </div>
              ))
            ) : (
              <p className="text-center">No replies yet.</p>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading thread or replies:", error);
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          Error loading replies. Please try again later.
        </div>
      </main>
    );
  }
}

export const runtime = "edge";
