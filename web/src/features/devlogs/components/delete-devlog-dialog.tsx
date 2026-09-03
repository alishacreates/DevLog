"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteDevLog } from "@/features/devlogs/actions/delete-devlog";

type DeleteDevLogDialogProps = {
  devLogId: string;
  devLogTitle: string;
};

export function DeleteDevLogDialog({
  devLogId,
  devLogTitle,
}: DeleteDevLogDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteDevLogWithId = deleteDevLog.bind(null, devLogId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
      >
        Delete DevLog
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete {devLogTitle}?
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone. This DevLog will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <form action={deleteDevLogWithId}>
            <Button type="submit" variant="destructive">
              Delete DevLog
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}