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
import Forum from "@/api/Forum";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function PostToForumButton({ forumID }: { forumID: any }) {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Client.session?.getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleClick = () => {
    console.log(forumID);
  };

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
      forumID,
      content: content!,
    };

    try {
      setLoading(true);
      const resp = await Forum.createThread(forumID, ThreadPayload);
      console.log("Thread created successfully:", resp);
      setOpen(false); // Close dialog
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      setLoading(false);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleClick}>Post to Forum</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Post to Forum</DialogTitle>
              <DialogDescription>What's on your mind?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                name="title"
                id="title"
                placeholder="Thread Title"
                disabled={loading}
                required
              />
              <Textarea
                name="content"
                id="content"
                placeholder="Thread Content"
                disabled={loading}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Posting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
