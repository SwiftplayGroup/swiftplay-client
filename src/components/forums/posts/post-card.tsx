import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Post } from "@/types/posts";
import Users from "@/api/User";

export async function PostCard(post: Post) {
  const user = await Users.getFromID(post.authorID);
  return (
    <div className="space-y-4 w-full max-w-4xl">
      <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
        <CardHeader className="pb-2 text-xl">@{user.username}</CardHeader>
        <CardContent className="text-sm text-gray-400">
          {post.content}
        </CardContent>
        <CardFooter className="text-muted text-sm">
          Like Button | Share Button | Save Button
        </CardFooter>
      </Card>
    </div>
  );
}
