import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Thread } from "@/types/threads.ts"

export function ThreadCard(thread: Thread) {
    return (
        <div className="space-y-4 w-full max-w-4xl mx-auto">
            <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
                <CardHeader className="pb-2 text-xl">
                    {thread.title}
                </CardHeader>
                <CardContent className="text-sm text-gray-400">
                    {thread.authorID}
                </CardContent>
            </Card>
        </div>
    );
}
