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

export default function CategoryCreationDialog({game, setGame}: {game: Game, setGame: (game: Game) => void}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          const category = await game.createRunCategory({
            name: categoryName
          });
          
          const newGame = new Game({
            ...game,
            categories: [
              ...game.categories,
              category
            ]
          });

          setGame(newGame);
          setCategoryName("");
          setIsOpen(false);

        } catch (error) {

          console.error(error);

        }
        
        setIsProcessing(false);

      }

    })();

  }, [categoryName, game, isProcessing, router, setGame]);

  useEffect(() => {
  
    async function updateAuthenticatedView() {

      const authenticatedUser = await Client.session?.getUser();
      const permission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.categories.create")
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
        <Button type="button">Create category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            The credits aren't the end of the game — the category is.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => setIsProcessing(true))}>
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input id="category-name" type="text" disabled={isProcessing} required value={categoryName} onChange={(event) => setCategoryName(event.target.value)} maxLength={64} minLength={1} />
              </FormControl>
              <FormDescription>
                Try to describe the mode with one or two words.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </form>
        </Form>
        <DialogFooter>
          <Button type="button" disabled={isProcessing || categoryName.length < 1 || categoryName.length > 64} onClick={() => setIsProcessing(true)}>Create category</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null

}