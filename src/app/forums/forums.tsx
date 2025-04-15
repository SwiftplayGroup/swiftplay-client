"use client";

import React, { useState, useEffect } from "react";
import { getForums } from "@/api/forums"
import { Forum } from "@/types/forums"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { DivideIcon } from "lucide-react";
import Link from "next/link";

export default function ForumsPage() {
    const [forums, setForums] = useState<Forum[]>([]);
    
    useEffect(() => {
        const fetchForums = async () => {
          try {
            const data = await getForums();
            console.log("Forums fetched:", data);
            setForums(data);
          } catch (error) {
            console.error("Error fetching forums:", error);
          }
        };
        fetchForums();
      }, []);

    

    return (
        <div>
            <div className="flex justify-center align-middle px-36">
            <div>
                {forums.map((forum, index) => (
                    <div className={index === 0 ? "mt-36" : "mt-2"} key={forum._id}>
                        <Link href={`/forums/${forum._id}`} passHref>
                            <Card className="w-[80vw]">
                                <CardHeader title="title" className="text-white text-4xl">
                                    {forum.name}
                                </CardHeader>
                                <CardDescription className="ml-6">
                                    {forum.description}
                                </CardDescription>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )

}