"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Like from "@/api/Like";
import { Heart } from "lucide-react";
import clsx from "clsx";

export function LikeButton({
  postID,
  userID,
}: {
  postID: string;
  userID: string;
}) {
  const [hasLiked, setHasLiked] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const liked = await Like.hasUserLiked(postID, userID);
        setHasLiked(liked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    fetchLikeStatus();
  }, [postID, userID]);

  const handleLike = async () => {
    if (hasLiked === null) return;

    const previous = hasLiked;
    const optimistic = !hasLiked;
    setHasLiked(optimistic);

    try {
      if (optimistic) {
        await Like.createLike(postID, userID);
      } else {
        await Like.deleteLike(postID, userID);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setHasLiked(previous); // revert
    }
  };

  const isLiked = hasLiked === true;

  return (
    <Button
      onClick={handleLike}
      variant="ghost"
      size="icon"
      className={clsx(
        "transition-colors",
        isLiked ? "text-red-500" : "text-muted-foreground",
      )}
    >
      <Heart
        className={clsx("h-5 w-5", {
          "fill-red-500": isLiked, // filled red heart
          "fill-none": !isLiked, // outlined heart
        })}
      />
    </Button>
  );
}
