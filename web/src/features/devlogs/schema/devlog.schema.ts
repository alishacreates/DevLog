import { z } from "zod";

export const devLogSchema = z.object({
  projectId: z
    .string()
    .trim()
    .min(1, "Project is required."),

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(140, "Title must be at most 140 characters."),

  content: z
    .string()
    .trim()
    .min(10, "Post content must be at least 10 characters.")
    .max(5000, "Post content must be at most 5000 characters."),

  tags: z
    .array(z.string().trim().min(1).max(40))
    .max(10, "You can add at most 10 tags."),

  images: z
    .array(z.string().url())
    .max(4, "You can upload at most 4 images."),
});

export type DevLogInput = z.infer<typeof devLogSchema>;