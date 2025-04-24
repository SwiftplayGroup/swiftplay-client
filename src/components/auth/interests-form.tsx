import React from "react";
import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

export default function InterestsForm() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Tell us about yourself!</SheetTitle>
            <SheetDescription>
              Fill out this form to help us recommend posts for you!
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4"></div>
          <SheetFooter>
            <Button type="submit">Submit</Button>
            <SheetClose asChild>
              <Button variant="outline">Skip</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
