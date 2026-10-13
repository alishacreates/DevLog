"use client";

import { useState } from "react";

import { deleteProject } from "@/features/projects/actions/delete-project";
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

type DeleteProjectDialogProps = {
  projectId: string;
  projectTitle: string;
};

export function DeleteProjectDialog({
  projectId,
  projectTitle,
}: DeleteProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteProjectWithId = deleteProject.bind(
    null,
    projectId
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
  className="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
>
  Delete project
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete {projectTitle}?
          </DialogTitle>

          <DialogDescription>
  This action cannot be undone. This project and its posts will be
  permanently deleted.
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

          <form action={deleteProjectWithId}>
            <Button type="submit" variant="destructive">
              Delete project
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}