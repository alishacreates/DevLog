import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^https?:\/\/.+/i.test(value),
    "Please enter a valid URL starting with http:// or https://."
  );

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Project title must be at least 2 characters.")
    .max(120, "Project title must be at most 120 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(2000, "Description must be at most 2000 characters."),

  status: z.enum(["planning", "in-progress", "completed"]),

  techStack: z
    .array(z.string().trim().min(1).max(40))
    .max(20, "You can add at most 20 technologies."),

  githubUrl: optionalUrl,

  liveUrl: optionalUrl,

  isPublic: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectSchema>;