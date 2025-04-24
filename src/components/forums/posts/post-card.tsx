"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Post } from "@/types/posts";
import Users from "@/api/User";
import { LikeButton } from "@/components/forums/likes/like-button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Users.session?.getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center h-screen justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
        <CardHeader className="pb-2 text-sm flex items-start justify-start space-x-2">
          <Link href={`/users/${user.username}`} className="hover:underline">
            <div className="flex items-start space-x-2">
              <Avatar>
                <AvatarImage src={user.avatarURL} alt="User Avatar" />
              </Avatar>
              <span className="align-start">@{user.username}</span>
            </div>
          </Link>
        </CardHeader>

        <CardContent className="text-lg text-gray-400 ml-[3rem] mt-[-1.75rem]">
          {post.content}
          <Separator className="my-2" />
        </CardContent>
        <CardFooter className="ml-[3rem] mt-[-1.75rem] flex items-center justify-between">
          <LikeButton postID={post._id} userID={user._id} />
        </CardFooter>
      </Card>
    </div>
  );
}
