"use client";
import { useEffect, useState } from "react";
import User from "@/api/User";
import Thread from "@/api/Thread";
import Post from "@/api/post";
import { ThreadCard } from "~/components/forums/threads/thread-card";
import { PostCard } from "~/components/forums/posts/post-card";

export default function ForYouPage() {
  const [user, setUser] = useState<any>(null);
  const [recommendedThreads, setRecommendedThreads] = useState<any[]>([]);
  const [recommendedPosts, setRecommendedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const currentUser = await User.session?.getUser();
        if (!currentUser) {
          setUser(null);
          setLoading(false);
          return;
        }
        setUser(currentUser);

        const threads = await Thread.getRecommendedThreads(currentUser._id);
        const posts = await Post.getRecommendedPosts(currentUser._id);
        console.log("Recommended Threads:", threads);
        console.log("Recommended Posts:", posts);

        setRecommendedThreads(threads || []);
        setRecommendedPosts(posts || []);
      } catch (err) {
        console.error("Error loading recommendations:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center h-screen justify-center">
        <p>Loading your feed...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center h-screen justify-center">
        <h1>Not logged in</h1>
        <p>Please log in to see your personalized feed.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center h-screen justify-center">
        <h1>Error loading recommendations</h1>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Hand Picked For You</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1 className="text-xl font-bold mb-4">Recommended Threads</h1>

        {recommendedThreads.recommendedThreads.map((thread) => (
          <div key={thread._id}>
            <ThreadCard {...thread} />
          </div>
        ))}
        <h1 className="text-xl font-bold mb-4">Recommended Posts</h1>
        {recommendedPosts.map((post) => (
          <div key={post._id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}
