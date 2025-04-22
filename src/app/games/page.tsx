"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import { Hexagon, Github, Twitter } from "lucide-react"
import  Footer  from "~/components/ui/footer"
const game = [
  { id: 1, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 2, title: "God of War", cover: "https://cdn.mobygames.com/e7439ec0-ab80-11ed-aa5a-02420a0001a0.webp" },
  { id: 3, title: "Hades", cover: "https://cdn.mobygames.com/a681555e-ac10-11ed-92cb-02420a000132.webp" },
  { id: 4, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 5, title: "Stardew", cover: "https://cdn.mobygames.com/7edc0cbc-abf5-11ed-9fde-02420a000132.webp" },
  { id: 6, title: "Mario and Wario", cover: "https://cdn.mobygames.com/beac7fac-abf0-11ed-b6e7-02420a000135.webp" },
  { id: 7, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 8, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 9, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 10, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 11, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 12, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 13, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 14, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 15, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 16, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 17, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 18, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 19, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 20, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 21, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 22, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 23, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
  { id: 24, title: "Elden Ring", cover: "https://cdn.mobygames.com/9a736412-ac12-11ed-b013-02420a00012e.webp" },
];

export default function games() {
  const [query, setQuery] = useState("");

  const filteredGames = game.filter(gamer =>
    gamer.title.toLowerCase().includes(query.toLowerCase())
  );

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
              <motion.div
                key={game.id}
                className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
              >
                <img
                  src={game.cover}
                  alt={game.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-lg">
                  {game.title}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    <div className="w-full">
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Swiftplay"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/forum", label: "Forum" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2024 Swiftplay",
          license: "All rights reserved",
        }}
      />
    </div>
  </div>
    
  );
}