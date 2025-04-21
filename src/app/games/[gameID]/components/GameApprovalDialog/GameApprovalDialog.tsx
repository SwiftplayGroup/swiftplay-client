import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import Game from "~/api/Game";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Client from "~/api/Client";
import Permission, { PermissionAccessLevel } from "~/api/Permission";

export default function GameApprovalDialog({game, setGame}: {game: Game, setGame: (game: Game) => void}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          const newGame = await game.approve();

          setGame(newGame);
          setIsOpen(false);

        } catch (error) {

          console.error(error);

        }
        
        setIsProcessing(false);

      }

    })();

  }, [game, isProcessing, router, setGame]);

  useEffect(() => {
  
    async function updateAuthenticatedView() {

      const authenticatedUser = await Client.session?.getUser();
      const permission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.approve")
      const permissionLevel = permission ? authenticatedUser?.permissionOverrides?.[permission._id] ?? PermissionAccessLevel.DENIED : PermissionAccessLevel.DENIED;
      const canShowDialog = permissionLevel >= PermissionAccessLevel.USER;

      setCanShowDialog(canShowDialog);

    }

    const channel = new BroadcastChannel("authentication");
    channel.addEventListener("message", updateAuthenticatedView);
    updateAuthenticatedView();

    return () => {

      channel.removeEventListener("message", updateAuthenticatedView);

    }

  }, []);

  return canShowDialog ? (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button type="button" disabled={!!game.approval}>Approve game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve game</DialogTitle>
          <DialogDescription>
            This will make the game accessible in search and in the games directory.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" disabled={isProcessing} onClick={() => setIsProcessing(true)}>Approve game</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null

}