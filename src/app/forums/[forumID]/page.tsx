import { getPosts, getForums } from "@/api/forums";
import { Forum } from "@/types/forums";
import { Post } from "@/types/posts";
import { PostCard } from "@/components/forums/posts/post-card"

// Maybe Christian should look at this. If we touch it, everything breaks and we don't know what it does.
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
  params = await params
  const forumID = await params.forumID;
  try {
    const posts = await getPosts(forumID);

    return (
      <div className="h-[50rem] pt-36">
        <div className="text-white ">
          {posts.map((post: Post) => (
            <div key={post._id} className = "text-white ">
              <PostCard {...post}/>
            </div>
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
