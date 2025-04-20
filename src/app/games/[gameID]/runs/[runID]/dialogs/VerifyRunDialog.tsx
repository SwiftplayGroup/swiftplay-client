"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Run from "~/api/Run";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

export default function VerifyRunDialog({run, setRun}: {run: Run, setRun: (run: Run) => void}) {

  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          const editedRun = run.verification ? await run.unverify() : await run.verify();
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
        <Button type="button" variant={run.verification ? "destructive" : "secondary"} disabled={isProcessing}>
          {run.verification ? "Unv" : "V"}erify run
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {run.verification ? "Unv" : "V"}erify run
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {run.verification ? "un" : ""}verify this run?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={run.verification ? "destructive" : undefined} onClick={() => setIsProcessing(true)}>
              {run.verification ? "Unv" : "V"}erify run
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