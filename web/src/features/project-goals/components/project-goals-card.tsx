
"use client";

import { useState, useTransition } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  addGoal,
  updateGoal,
  toggleGoal,
  deleteGoal,
} from "@/features/project-goals/actions/goal-actions";

type Goal = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type Props = {
  projectId: string;
  goals: Goal[];
  isOwner: boolean;
};

export function ProjectGoalsCard({
  projectId,
  goals,
  isOwner,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goalTitle, setGoalTitle] = useState("");
  const [pending, startTransition] = useTransition();

  const completed = goals.filter((goal) => goal.isCompleted).length;
  const progress = goals.length
    ? Math.round((completed / goals.length) * 100)
    : 0;

  function openAddDialog() {
    setEditingGoal(null);
    setGoalTitle("");
    setDialogOpen(true);
  }

  function openEditDialog(goal: Goal) {
    setEditingGoal(goal);
    setGoalTitle(goal.title);
    setDialogOpen(true);
  }

  function runAction(
    action: () => Promise<{ success: boolean; error?: string }>,
    onSuccess?: () => void
  ) {
    startTransition(async () => {
      try {
        const result = await action();

        if (!result.success) {
          toast.error(result.error ?? "Something went wrong.");
          return;
        }

        onSuccess?.();
      } catch {
        toast.error("Something went wrong.");
      }
    });
  }

  function handleSaveGoal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!goalTitle.trim() || pending) return;

    const title = goalTitle.trim();

    if (editingGoal) {
      runAction(
        () => updateGoal(projectId, editingGoal.id, title),
        () => setDialogOpen(false)
      );
    } else {
      runAction(
        () => addGoal(projectId, title),
        () => setDialogOpen(false)
      );
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-section-label text-primary dark:text-accent-warm">
              Project Progress
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Project Goals
            </h2>
          </div>

          {isOwner && (
            <button
              type="button"
              onClick={openAddDialog}
              disabled={pending || goals.length >= 50}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-accent-warm dark:text-[#101513]"
            >
              <Plus className="size-4" />
              Add Goal
            </button>
          )}
        </div>

        {goals.length > 0 ? (
          <>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completed} of {goals.length} completed
              </span>
              <span className="font-semibold">{progress}%</span>
            </div>

            <div
              role="progressbar"
              aria-label="Project goals completed"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
            >
              <div
               className="h-full rounded-full bg-success transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <p className="mt-5 text-sm text-muted-foreground">
            No goals added yet.
          </p>
        )}

        {goals.length > 0 && (
          <div className="mt-6 space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center gap-3 rounded-xl border border-border p-3"
              >
                <input
                  type="checkbox"
                  checked={goal.isCompleted}
                  disabled={!isOwner || pending}
                  aria-label={`Complete ${goal.title}`}
                  onChange={(event) =>
                    runAction(() =>
                      toggleGoal(
                        projectId,
                        goal.id,
                        event.target.checked
                      )
                    )
                  }
                  className="size-4 accent-primary"
                />

                <span
                  className={`min-w-0 flex-1 break-words text-sm ${
                    goal.isCompleted
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {goal.title}
                </span>

                {isOwner && (
                  <>
                    <button
                      type="button"
                      disabled={pending}
                      aria-label={`Edit ${goal.title}`}
                      onClick={() => openEditDialog(goal)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </button>

                    <button
                      type="button"
                      disabled={pending}
                      aria-label={`Delete ${goal.title}`}
                      onClick={() =>
                        runAction(() =>
                          deleteGoal(projectId, goal.id)
                        )
                      }
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!pending) setDialogOpen(open);
        }}
      >
        <DialogContent showCloseButton={!pending}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingGoal ? "Edit Goal" : "Add Project Goal"}
            </DialogTitle>

            <DialogDescription>
              {editingGoal
                ? "Update your project goal."
                : "Define the next milestone for your project."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveGoal}>
            <div className="space-y-2">
              <label
                htmlFor="goal-title"
                className="text-sm font-medium"
              >
                Goal title
              </label>

              <input
                id="goal-title"
                value={goalTitle}
                onChange={(event) =>
                  setGoalTitle(event.target.value)
                }
                maxLength={120}
                disabled={pending}
                autoFocus
                placeholder="e.g. Implement authentication"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />

              <p className="text-right font-mono text-xs text-muted-foreground">
                {goalTitle.length}/120
              </p>
            </div>

            <DialogFooter className="mt-6">
              <button
                type="button"
                disabled={pending}
                onClick={() => setDialogOpen(false)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={pending || !goalTitle.trim()}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50 dark:bg-accent-warm dark:text-[#101513]"
              >
                {pending
                  ? "Saving..."
                  : editingGoal
                    ? "Save Changes"
                    : "Add Goal"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
