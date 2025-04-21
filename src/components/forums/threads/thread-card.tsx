import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Thread } from "@/types/threads.ts";
import Users from "@/api/User";

export async function ThreadCard(thread: Thread) {
  const user = await Users.getFromID(thread.authorID);

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
        <CardHeader className="pb-2 text-xl">{thread.title}</CardHeader>
        <CardContent className="text-sm text-gray-400">
          Created by {user.username}
        </CardContent>
      </Card>
    </div>
  );
}
