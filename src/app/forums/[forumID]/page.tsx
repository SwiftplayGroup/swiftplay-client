import { getForumThreads, getForums } from "@/api/forums";
import { Forum } from "@/types/forums";

export async function generateStaticParams() {
  try {
    const forums = await getForums();
    return forums.map((forum: Forum) => ({
      forumID: forum._id,
    }));
  } catch (error) {
    return [];
  }
}

export default async function ForumPage({
  params,
}: {
  params: { forumID: string };
}) {
  try {
    const forumID = await params; //await params to avoid disaster
    const threads = await getForumThreads(forumID.forumID);

    return (
      <div className="h-[50rem] flex items-center justify-center">
        <div className="text-white">
          {threads.map((thread: Forum) => (
            <div key={thread._id}>{thread._id}</div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="h-[50rem] flex items-center justify-center">
        <div className="text-red-500">
          Error loading forum threads. Please try again later.
        </div>
      </div>
    );
  }
}
