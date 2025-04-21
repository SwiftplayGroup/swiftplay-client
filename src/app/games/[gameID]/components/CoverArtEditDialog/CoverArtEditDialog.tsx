import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Game from "~/api/Game";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import Client from "~/api/Client";
import Permission, { PermissionAccessLevel } from "~/api/Permission";

export default function CoverArtEditDialog({game, setGame}: {game: Game, setGame: (game: Game) => void}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
  const [coverArtURL, setCoverArtURL] = useState<string>(game.coverArtURL ?? "");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {
          
          const newGame = await game.edit({
            coverArtURL: coverArtURL.trim() ? coverArtURL : null
          })

          setGame(newGame);
          setCoverArtURL("");
          setIsOpen(false);

        } catch (error) {

          console.error(error);

        }
        
        setIsProcessing(false);

      }

    })();

  }, [coverArtURL, game, isProcessing, router, setGame]);

  useEffect(() => {
  
    async function updateAuthenticatedView() {

      const authenticatedUser = await Client.session?.getUser();
      const permission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.edit")
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

  const form = useForm();

  return canShowDialog ? (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button type="button">Edit cover art</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit cover art</DialogTitle>
          <DialogDescription>
            Let's add some life to that game.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => setIsProcessing(true))}>
            <FormItem>
              <FormLabel>Cover art image URL</FormLabel>
              <FormControl>
                <Input id="cover-art-url" type="text" disabled={isProcessing} value={coverArtURL} onChange={(event) => setCoverArtURL(event.target.value)} />
              </FormControl>
              <FormDescription>
                This should link to a static image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </form>
        </Form>
        <DialogFooter>
          <Button type="button" disabled={isProcessing} onClick={() => setIsProcessing(true)}>Edit cover art</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null

}