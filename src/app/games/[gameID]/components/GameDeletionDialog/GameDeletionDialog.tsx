import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import Game from "~/api/Game";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Client from "~/api/Client";
import Permission, { PermissionAccessLevel } from "~/api/Permission";

export default function GameDeletionDialog({game}: {game: Game}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          await game.delete();
          router.replace("/games");

          setIsOpen(false);

        } catch (error) {

          console.error(error);
          setIsProcessing(false);

        }

      }

    })();

  }, [game, isProcessing, router]);

  useEffect(() => {
  
    async function updateAuthenticatedView() {

      const authenticatedUser = await Client.session?.getUser();
      const approvePermission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.delete");
      const permissionLevel = approvePermission ? authenticatedUser?.permissionOverrides?.[approvePermission._id] ?? PermissionAccessLevel.DENIED : PermissionAccessLevel.DENIED;
      const canShowDialog = permissionLevel >= PermissionAccessLevel.USER && permissionLevel >= PermissionAccessLevel.USER;

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
        <Button type="button" variant="destructive" disabled={isProcessing}>Delete game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete game</DialogTitle>
          <DialogDescription>
            This will delete this game, including all associated categories and runs.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="destructive" disabled={isProcessing} onClick={() => setIsProcessing(true)}>Delete run</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null

}