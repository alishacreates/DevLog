import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(1000, "Comment must be at most 1000 characters."),

  contentJson: z
    .string()
    .max(12000, "Comment formatting data is too large.")
    .optional(),
});

export type CommentInput = z.infer<
  typeof commentSchema
>;