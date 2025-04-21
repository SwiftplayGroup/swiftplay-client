import { PostCard } from "@/components/forums/posts/post-card";
import { ThreadCard } from "@/components/forums/threads/thread-card";
import { getReplies, getThread } from "@/api/threads";
import { Post } from "@/types/posts";
import { Button } from "@/components/ui/button";

export default async function ForumPage({
  params,
}: {
  params: Promise<{ threadID: string }>;
}) {
  const { threadID } = await params;

  try {
    const thread = await getThread(threadID);
    const replies = await getReplies(threadID);

    return (
      <div className="pt-36">
        <ThreadCard {...thread} />
        <div className="h-[50rem]">
          <Button onClick={() => {}}>Add Reply</Button>
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
