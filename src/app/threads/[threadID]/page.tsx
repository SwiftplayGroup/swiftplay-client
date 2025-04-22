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
      <div className="h-[50rem] pt-36">
        <ThreadCard {...thread} />
        <div className="h-[50rem]">
          <PostToThreadButton threadID={thread._id} forumID={thread.forumID} />
          <div className="text-white">
            {replies.map((reply: Post) => (
              <div key={reply._id}>
                <PostCard {...reply} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading thread or replies:", error);
    return (
      <div className="h-[50rem] flex items-center justify-center">
        <div className="text-red-500">
          Error loading replies. Please try again later.
        </div>
      </div>
    );
  }
}
export const runtime = "edge";
