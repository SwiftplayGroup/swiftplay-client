import { getForumThreads } from "@/api/forums";
import { Forum } from "@/types/forums";

export async function generateStaticParams() {
  // Implementation needed here
}

export default async function ForumPage({ params }: { params: { forumID: string } }) {
  console.log(params.forumID);
  console.log("I'm here");

  const threads = await getForumThreads(params.forumID);

  return (
    <div className="h-[50rem] flex items-center justify-center">
      <div className="text-white">
        {threads.map((thread: Forum) => (
          <div key={thread._id}>
            {thread._id}
          </div>
        ))}
      </div>
    </div>
  );
}