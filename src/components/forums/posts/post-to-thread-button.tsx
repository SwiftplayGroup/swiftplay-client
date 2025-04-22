"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Thread from "@/api/threads";
import Client from "@/api/Client";

export function PostToThreadButton({
  forumID,
  threadID,
}: {
  forumID: any;
  threadID: any;
}) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }
    const user = await Client.session?.getUser();

    const PostPayload = {
      title: title,
      authorID: user._id,
      forumID: forumID,
      threadID: threadID,
      content: content,
    };
    try {
      await Thread.createPost(threadID, PostPayload);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Post to Thread</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Post to Forum</DialogTitle>
              <DialogDescription>Whats on your mind?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input name="title" id="title" placeholder="Post Title" />
              <Textarea
                name="content"
                id="content"
                placeholder="Post Content"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
