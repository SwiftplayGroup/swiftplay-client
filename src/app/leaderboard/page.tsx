"use client";
import "@/app/globals.css";
import "@mantine/core/styles.css";
import { HeroHighlightDemo } from "~/components/leaderboard/hero-highlight";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "~/components/ui/dialog";
import { LeaderboardScoreCard } from "~/components/leaderboard/leaderboard-score-card";

export default function LeaderboardPage() {
  return (
    <div className=" w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] ">
      <div className="flex justify-end m-4">
        <Dialog>
          <div className="flex justify-center fixed">
            <DialogTrigger asChild>
              <Button>Submit a Run</Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px] bg-black">
            {/* This is where you would add the form for submitting a run
             Shadcn has a great example of dialogs on their site, as well as sites like 21st dev and aceternity */}
          </DialogContent>
        </Dialog>
      </div>
      <div className="max-h-[500px]">
        <HeroHighlightDemo />
      </div>
      <div>
        <LeaderboardScoreCard
          name="SpeedRunner123"
          time="1:23.456"
          date="2024-03-20"
          youtubeLink="https://youtu.be/dQw4w9WgXcQ?si=t--0sOpuDgyKaIdM"
        />
        <LeaderboardScoreCard
          name="SwiftMaster"
          time="1:24.789"
          date="2024-03-19"
          youtubeLink="https://youtu.be/dQw4w9WgXcQ?si=t--0sOpuDgyKaIdM"
        />
        <LeaderboardScoreCard
          name="ProGamer"
          time="1:25.012"
          date="2024-03-18"
          youtubeLink="https://youtu.be/dQw4w9WgXcQ?si=t--0sOpuDgyKaIdM"
        />
      </div>
    </div>
  );
}
