"use client";
import React from "react";
import HeroParallaxDemo from "~/components/home/hero-parallax";
import NavbarDemo from "~/components/aceternity/navbar-menu";
import GoogleGeminiEffectDemo from "~/components/home/google-gemini-effect";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { GlowingEffectBento } from "~/components/home/glowing-effect";

export default function Page() {
  return (
    <div className="bg-black">
      <NavbarDemo />
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-8 py-24">
        {/* Left Side: Title */}
        <div className="w-full md:w-1/2 flex justify-center">
          <HeroHighlight>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-white px-4 md:text-4xl lg:text-5xl font-bold leading-relaxed lg:leading-snug text-center md:text-left"
            >
              <div className="text-6xl mb-8">Compete with</div>
              <Highlight className="pb-2 text-black text-8xl dark:text-white">
                Swiftplay
              </Highlight>
            </motion.h1>
          </HeroHighlight>
        </div>

        {/* Right Side: Glowing Effect Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <GlowingEffectBento />
        </motion.div>
      </div>

      <div>
        <GoogleGeminiEffectDemo />
      </div>
      <div>
        <HeroParallaxDemo />
      </div>
    </div>
  );
}
