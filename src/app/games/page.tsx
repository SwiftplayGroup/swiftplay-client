"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import { Skeleton } from "~/components/ui/skeleton";
import Game from "~/api/Game";
import Link from "next/link";

export default function Games() {
  const [query, setQuery] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const filteredGames = games.filter(gamer =>
    gamer.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {

    (async () => {

      const games = await Game.find();
      setGames(games);
      

    })();

  }, []);

  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center -mt-40">
      

      {/* Title Section */}
      <div className="">
        <HeroHighlight>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-white md:text-4xl lg:text-5xl font-bold text-center md:text-left leading-tight"
          >
            <Highlight className="pb-2 text-black text-5xl dark:text-white">
              Games
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </div>

      {/* Search & Game Grid */}
      <div className="flex flex-col items-center gap-4 -mt-20">
        <motion.input
          type="text"
          placeholder="Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 w-full max-w-lg rounded-xl text-black shadow-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition -mt-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.div
          className="grid grid-cols-6 grid-rows-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <AnimatePresence>
            {filteredGames.map((game) => (
              
              <Link href={`/games/${game._id}`}>
                <motion.div
                  key={game._id}
                  className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                >
                {game.coverArtURL ? (
                  <img
                    src={game.coverArtURL}
                    className="w-30 h-40 object-cover"
                    />
                  ) : (
                    <Skeleton className="h-40 w-30" />
                    )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-lg">
                    {game.name}
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
  </div>
    
  );
}