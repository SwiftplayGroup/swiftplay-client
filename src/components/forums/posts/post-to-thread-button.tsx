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
import { Textarea } from "@/components/ui/textarea";
import Thread from "@/api/Thread";
import Client from "@/api/Client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // <- Spinner icon

export function PostToThreadButton({
  forumID,
  threadID,
}: {
  forumID: any;
  threadID: any;
}) {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const content = formData.get("content") as string;
    if (!content) {
      alert("Please fill in all fields");
      return;
    }

    const PostPayload = {
      authorID: user!._id,
      forumID,
      threadID,
      content,
    };

    try {
      setLoading(true);
      await Thread.createPost(threadID, PostPayload);
      setOpen(false);
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
          <Button>Post to Thread</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Post to Thread</DialogTitle>
              <DialogDescription>What's on your mind?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                name="content"
                id="content"
                placeholder="Post Content"
                disabled={loading}
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
