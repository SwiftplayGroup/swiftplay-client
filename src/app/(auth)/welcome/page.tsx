"use client";
import { useState } from "react";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { ToggleGroup } from "~/components/ui/toggle-group";
import { motion } from "framer-motion";
import User from "~/api/User";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const interests = [
  "Valorant",
  "League of Legends",
  "CS2",
  "Dota 2",
  "Apex Legends",
  "Overwatch",
  "Fortnite",
  "Minecraft",
  "Roblox",
  "Call of Duty",
  "PUBG",
  "Rainbow Six Siege",
  "Genshin Impact",
  "Honkai: Star Rail",
  "World of Warcraft",
  "Final Fantasy XIV",
  "The Elder Scrolls Online",
  "Destiny 2",
  "Star Wars: The Old Republic",
  "ARK: Survival Evolved",
  "Rust",
  "Sea of Thieves",
  "Valheim",
  "Phasmophobia",
  "Dead by Daylight",
  "Among Us",
  "Fall Guys",
  "Stardew Valley",
  "Terraria",
  "Factorio",
  "Cities: Skylines",
  "Satisfactory",
  "Oxygen Not Included",
  "Hades",
  "Celeste",
  "Hollow Knight",
  "Undertale",
  "Cuphead",
  "Slay the Spire",
  "Dead Cells",
  "The Binding of Isaac",
  "Hollow Knight: Silksong",
  "Ori and the Blind Forest",
  "Ori and the Will of the Wisps",
  "Gris",
  "Journey",
  "Firewatch",
  "What Remains of Edith Finch",
  "The Witness",
  "Inside",
  "Limbo",
  "Oxenfree",
  "Night in the Woods",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function WelcomePage() {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    setIsLoading(true);
    const user = await User.session?.getUser();
    console.log("User: ", user);
    if (!user) {
      console.error("User not found");
      return;
    }
    await User.updateEmbeddings(selectedGames.join(", "), user._id);
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="flex justify-center px-4 py-32">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold">Welcome to the App!</h1>
        <p className="mt-4 text-lg">
          Choose some of your interests so we can tailor your feed to you!
        </p>

        <motion.div
          className="mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ToggleGroup
            type="multiple"
            value={selectedGames}
            onValueChange={setSelectedGames}
            className="flex flex-wrap justify-center gap-2"
          >
            {interests.map((game) => (
              <motion.div key={game} variants={itemVariants}>
                <ToggleGroupItem
                  value={game}
                  className={`px-4 py-2 rounded-full transition-colors text-sm font-medium border ${
                    selectedGames.includes(game)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {game}
                </ToggleGroupItem>
              </motion.div>
            ))}
          </ToggleGroup>
        </motion.div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your selections:</h2>
          <p className="mt-2 text-gray-700">
            {selectedGames.length > 0
              ? selectedGames.join(", ")
              : "Nothing selected yet"}
          </p>
        </div>
        <Button
          className="mt-4"
          disabled={selectedGames.length == 0}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 /> Loading...
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
}
