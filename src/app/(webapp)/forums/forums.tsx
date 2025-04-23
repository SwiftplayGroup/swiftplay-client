"use client";
import React, { useState, useEffect } from "react";
import Forum from "@/api/Forum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        setIsLoading(true);
        const data = await Forum.getAll();
        setForums(data);
      } catch (error) {
        console.error("Error fetching forums:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchForums();
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Forums</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Loading forums...</div>
          </div>
        ) : forums.length === 0 ? (
          <div className="text-center py-12">
            <p>No forums found.</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {forums.map((forum) => (
              <Link
                href={`/forums/${forum._id}`}
                key={forum._id}
                className="block"
              >
                <Card className="transition-all duration-300 hover:shadow-md hover:bg-zinc-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{forum.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-400">
                    {forum.description}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
