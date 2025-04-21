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

          const newGame = game.approval ? await game.unapprove() : await game.approve();

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
      const approvePermission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.approve");
      const editPermission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.edit");
      const approvePermissionLevel = approvePermission ? authenticatedUser?.permissionOverrides?.[approvePermission._id] ?? PermissionAccessLevel.DENIED : PermissionAccessLevel.DENIED;
      const editPermissionLevel = editPermission ? authenticatedUser?.permissionOverrides?.[editPermission._id] ?? PermissionAccessLevel.DENIED : PermissionAccessLevel.DENIED;
      const canShowDialog = approvePermissionLevel >= PermissionAccessLevel.USER && editPermissionLevel >= PermissionAccessLevel.USER;

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
        <Button type="button" variant={game.approval ? "destructive" : "default"} disabled={isProcessing}>{game.approval ? "Una" : "A"}pprove game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{game.approval ? "Una" : "A"}pprove game</DialogTitle>
          <DialogDescription>
            This will make the game {game.approval ? "in" : ""}accessible in search and in the games directory.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant={game.approval ? "destructive" : "default"} disabled={isProcessing} onClick={() => setIsProcessing(true)}>{game.approval ? "Una" : "A"}pprove game</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null

}