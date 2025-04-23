import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Client from "~/api/Client";
import Permission, { PermissionAccessLevel } from "~/api/Permission";
import Category from "~/api/Category";

export default function CategoryDeletionDialog({category, onDelete}: {category: Category, onDelete: () => void}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {
          
          await category.delete();

          setIsOpen(false);
          onDelete();

        } catch (error) {

          console.error(error);

        }
        
        setIsProcessing(false);

      }

    })();

  }, [category, isProcessing, router, onDelete]);

  useEffect(() => {
  
    async function updateAuthenticatedView() {

      const authenticatedUser = await Client.session?.getUser();
      const permission = (await Permission.find()).find((permission) => permission.hierarchicalName === "games.categories.delete")
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
        <Button variant="destructive" type="button">Delete category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete "{category.name}" category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? All associated runs will be moved to the default category.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="destructive" disabled={isProcessing} onClick={() => setIsProcessing(true)}>Delete category</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null

}