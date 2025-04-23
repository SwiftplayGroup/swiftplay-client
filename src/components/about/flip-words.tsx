import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Highlight } from "../ui/hero-highlight";

export function FlipWordsSection() {
  const words = ["modern", "functional", "stunning", "unique"];

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="text-4xl md:text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        websites with the devs at{" "}
        <Highlight className="text-black dark:text-white font-bold">
          Swiftplay
        </Highlight>
      </div>
    </div>
  );
}
