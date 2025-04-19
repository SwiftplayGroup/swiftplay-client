import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Post } from "@/types/posts";

export function PostCard(post: Post) {
  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
        <CardHeader className="pb-2 text-xl">{post.user}</CardHeader>
        <CardContent className="text-sm text-gray-400">
          {post.content}
        </CardContent>
      </Card>
    </div>
  );
}
