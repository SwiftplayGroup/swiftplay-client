import { getThreads, getForums } from "@/api/forums";
import { Forum } from "@/types/forums";
import { Thread } from "@/types/threads";
import { ThreadCard } from "@/components/forums/threads/thread-card"

export async function generateStaticParams() {
  try {
    const forums = await getForums();
    return forums.map((forum: Forum) => ({
      forumID: forum._id,
    }));
  } catch (error) {
        console.log(error);
    return [];
  }
}

export default async function ForumPage({
  params,
}: {
  params: { forumID: string };
}) {
  params = await params
  const forumID = await params.forumID;
  try {
    const threads = await getThreads(forumID);

    return (
      <div className="h-[50rem] pt-36">
        <div className="text-white ">
          {threads.map((thread: Thread) => (
            <div key={thread._id} className = "text-white ">
              <ThreadCard {...thread}/>
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
