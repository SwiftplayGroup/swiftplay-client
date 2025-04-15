"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import NavbarDemo from "~/components/example/navbar-menu-demo";
import HeroParallaxDemo from "~/components/example/hero-parallax-demo";
import GoogleGeminiEffectDemo from "~/components/example/google-gemini-effect-demo";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import { GlowingEffectDemo } from "~/components/example/glowing-effect-demo";
const games = [
  { id: 1, title: "Elden Ring" },
  { id: 2, title: "God of War" },
  { id: 3, title: "Hades" },
  { id: 4, title: "Stardew Valley" },
  { id: 5, title: "Cyberpunk 2077" },
  { id: 6, title: "Baldur's Gate 3" },
];

export default function Search() {
  const [query, setQuery] = useState("");

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <NavbarDemo />
<div className="w-full md:w-1/2 flex justify-center -mt-40">
          <HeroHighlight>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-white px-4 md:text-4xl lg:text-5xl font-bold leading-relaxed lg:leading-snug text-center md:text-left mt-40"
            >
              <Highlight className="pb-2 text-black text-8xl dark:text-white">
                Games
              </Highlight>
            </motion.h1>
          </HeroHighlight>
        </div>
        <div className = "-mt-40">
        <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        
        {filteredGames.map((game) => (
          <motion.div
            key={game.id}
            className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-xl text-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            {game.title}
          </motion.div>
        ))}
      </motion.div>
      <input
        type="text"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 w-full max-w-lg rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500 mt-8"
      />
      </div>
    </div>
  );
}