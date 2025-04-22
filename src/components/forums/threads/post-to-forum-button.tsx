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
import Client from "@/api/Client";
import Forum from "@/api/forums";

export async function PostToForumButton(forumID: any, threadID: any) {
  const handleClick = () => {
    console.log(forumID.forumID);
  };
  const user = await Client.session?.getUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const title = formData.get("title");
    const content = formData.get("content");
    if (typeof title !== "string" || typeof content !== "string") {
      alert("Title and content must be text");
      return;
    }

    const ThreadPayload = {
      title: title!,
      authorID: user!._id,
      forumID: forumID.forumID,
      content: content!,
    };
    try {
      console.log("Client Session: ", Client.session);
      const resp = await Forum.createThread(forumID.forumID, ThreadPayload);
      console.log("Thread created successfully:", resp);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <Button>Login to Post</Button>
      </div>
    );
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleClick}>Post to Form</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Post to Forum</DialogTitle>
              <DialogDescription>Whats on your mind?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                name="title"
                id="title"
                placeholder="Thread Title"
                required
              />
              <Textarea
                name="content"
                id="content"
                placeholder="Thread Content"
                required
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
