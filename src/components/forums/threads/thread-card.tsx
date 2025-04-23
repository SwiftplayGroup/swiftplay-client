import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Thread } from "@/types/threads.ts";
import Users from "@/api/User";
import Link from "next/link";

export async function ThreadCard(thread: Thread) {
  const user = await Users.getFromID(thread.authorID);

  return (
    <div className="space-y-4 w-full">
      <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
        <CardHeader className="pb-2 text-xl hover:underline">
          <Link
            href={`/threads/${thread._id}`}
            key={thread._id}
            className="block"
          >
            {thread.title}
          </Link>
        </CardHeader>
        <CardContent className="text-sm text-gray-400 italic">
          Created by{" "}
          <Link
            href={`/users/${user.username}`}
            key={user._id}
            className="hover:underline not-italic "
          >
            @{user.username}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
