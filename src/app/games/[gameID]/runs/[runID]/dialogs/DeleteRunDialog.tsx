"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Run from "~/api/Run";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

export default function DeleteRunDialog({run}: {run: Run}) {

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        await run.delete();
        router.replace(`/games/${run.game._id}`);

      }

    })()
    
  }, [isProcessing, router, run]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive" disabled={isProcessing}>Delete run</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete run
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this run? No takesies-backsies. 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
          <Button type="button" variant="destructive" onClick={() => setIsProcessing(true)}>Take it down</Button>
          </DialogClose>
          <DialogClose asChild>
          <Button type="button" variant="secondary">Nevermind</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}