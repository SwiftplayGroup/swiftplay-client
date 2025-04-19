"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Run from "~/api/Run";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

export default function RemoveRunDialog({run, setRun}: {run: Run, setRun: (run: Run) => void}) {

  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          const editedRun = run.removal ? await run.restore() : await run.remove();
          setRun(editedRun);

        } catch (error) {

          console.error(error);

        }

        setIsProcessing(false);
        setIsOpen(false);

      }

    })()
    
  }, [isProcessing, router, run, setRun]);

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button type="button" variant={run.removal ? "secondary" : "destructive"} disabled={isProcessing}>
          R{run.removal ? "estore" : "emove"} run
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            R{run.removal ? "estore" : "emove"} run
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to r{run.removal ? "estore" : "emove"} this run? This will {run.removal ? "make the run accessible to the public again." : "hide it from non-moderators, except the submitter."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={run.removal ? undefined : "destructive"} onClick={() => setIsProcessing(true)}>
              R{run.removal ? "estore" : "emove"} run
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Nevermind</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}