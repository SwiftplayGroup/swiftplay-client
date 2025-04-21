import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import Game from "~/api/Game";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RunSubmissionDialog({game}: {game: Game}) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategoryID, setSelectedCategoryID] = useState<string>("default");
  const [youtubeWatchID, setYouTubeWatchID] = useState<string>("");
  const [durationMilliseconds, setDurationMilliseconds] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {

      if (isProcessing) {

        try {

          const run = await game.submitRun({
            youtubeWatchID,
            durationMilliseconds,
            categoryID: selectedCategoryID === "default" ? undefined : selectedCategoryID
          });

          router.push(`/games/${run.game._id}/runs/${run._id}`);

        } catch (error) {

          console.error(error);

        }

        setIsProcessing(false);

      }

    })();

  }, [durationMilliseconds, game, isProcessing, router, selectedCategoryID, youtubeWatchID]);

  const form = useForm();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button type="button">Submit run</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit run</DialogTitle>
          <DialogDescription>
            You're about a send a run for the world to see. Once you submit, we'll verify it to make it official.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => setIsProcessing(true))}>
            <section className="mb-4">
              <Label htmlFor="email">Category</Label>
              <Select value={selectedCategoryID} disabled={isProcessing || game.categories.length < 1} onValueChange={(newSelectedCategoryID) => setSelectedCategoryID(newSelectedCategoryID)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  {
                    game.categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </section>
            <FormItem>
              <FormLabel>Time in milliseconds</FormLabel>
              <FormControl>
                <Input id="time" type="number" disabled={isProcessing} required min={1} max={Number.MAX_SAFE_INTEGER} step={1} value={durationMilliseconds} onChange={(event) => setDurationMilliseconds(parseInt(event.target.value, 10) || 1)} />
              </FormControl>
              <FormDescription>
                Need a calculator? <Link href="https://www.omnicalculator.com/conversion/milliseconds-converter" target="_blank"><u>Check this one out.</u></Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>YouTube watch ID</FormLabel>
              <FormControl>
                <Input id="youtubeURL" type="text" disabled={isProcessing} required value={youtubeWatchID} onChange={(event) => setYouTubeWatchID(event.target.value)} maxLength={11} minLength={11} />
              </FormControl>
              <FormDescription>
                You can find this at the end of the YouTube video URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </form>
        </Form>
        <DialogFooter>
          <Button type="button" disabled={isProcessing || !youtubeWatchID} onClick={() => setIsProcessing(true)}>Submit run</Button>
          <Button type="button" variant="secondary" disabled={isProcessing} onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}