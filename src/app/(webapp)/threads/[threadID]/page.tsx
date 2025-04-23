import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostCard } from "@/components/forums/posts/post-card";
import { ThreadCard } from "@/components/forums/threads/thread-card";
import Thread from "@/api/Thread";
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
      <main className="min-h-screen px-4 sm:px-8 flex">
        {/* Left Section: Thread and Replies */}
        <div className="w-2/3 space-y-6 pr-4">
          {/* Thread Header */}
          <ThreadCard {...thread} />

          {/* Post Reply Button */}
          <div className="flex justify-center">
            <PostToThreadButton
              threadID={thread._id}
              forumID={thread.forumID}
            />
          </div>

          {/* Replies */}
          <div className="max-h-[calc(40rem - 8rem)] overflow-y-auto space-y-4">
            {replies.length > 0 ? (
              replies.map((reply: Post) => (
                <div key={reply._id}>
                  <PostCard {...reply} />
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No replies yet.
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Fixed Filter */}
        <aside className="sticky top-6 w-1/3 pl-4 h-[calc(2 * (240px + 16px))]">
          <Card className="shadow-md">
            <CardHeader>
              <h2 className="text-lg font-semibold">Filter Posts</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sort">Sort By</Label>
                <Select id="sort">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    {/* Add more sorting options */}
                  </SelectContent>
                </Select>
              </div>
              {/* Add more filter components using Shadcn UI */}
              {/* Example: */}
              {/* <div className="space-y-2">
                <Label htmlFor="tags">Filter by Tags</Label>
                <Select multiple id="tags">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="tailwindcss">Tailwind CSS</SelectItem>
                    {/* Add more tag options */}
              <p className="text-sm text-muted-foreground">
                Further filter options will appear here.
              </p>
            </CardContent>
          </Card>
        </aside>
      </main>
    );
  } catch (error) {
    console.error("Error loading thread or replies:", error);
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-muted-foreground">
          Error loading replies. Please try again later.
        </div>
      </main>
    );
  }
}

export const runtime = "edge";
