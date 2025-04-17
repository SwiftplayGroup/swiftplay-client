import { PostCard } from "@/components/forums/posts/post-card.tsx"
import { getReplies, getThread  } from "@/api/threads.ts"
import { Thread } from "@/types/threads";
import { Link } from "next/link";
import { Post} from "@/types/posts"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  try {
    const replies = await getReplies();
    return replies.map((reply: Post) => ({
      replyID: reply._id,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function ForumPage({
  params,
}: {
  params: { threadID: string };
}) {
  params = await params;
  const threadID= await params.threadID;
    const thread = await getThread(threadID);
  try {
    const replies = await getReplies(threadID);

    return (
    <div className="pt-36">
        <ThreadCard {...thread} />
      <div className="h-[50rem]">
                    <Button onClick={() => {}} >Add Reply</Button>
        <div className="text-white ">
          {replies.map((reply: Post) => () => (
            <Link href={`/threads/${thread._id}`}>
              <div key={reply._id}>
                <PostCard {...reply} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    );
  } catch (error) {
    console.log("Error: ", error);
    return (
      <div className="h-[50rem] flex items-center justify-center">
        <div className="text-red-500">
          Error loading replies. Please try again later.
        </div>
      </div>
    );
  }
}


