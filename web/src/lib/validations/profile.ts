import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^https?:\/\/.+/i.test(value),
    "Please enter a valid URL starting with http:// or https://."
  );

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(80, "Name must be at most 80 characters."),

  bio: z
    .string()
    .trim()
    .max(300, "Bio must be at most 300 characters."),

  university: z
    .string()
    .trim()
    .max(120, "University must be at most 120 characters."),

  location: z
    .string()
    .trim()
    .max(100, "Location must be at most 100 characters."),

  skills: z
    .array(z.string().trim().min(1).max(40))
    .max(20, "You can add at most 20 skills."),

  techStack: z
    .array(z.string().trim().min(1).max(40))
    .max(20, "You can add at most 20 technologies."),

  github: optionalUrl,

  portfolio: optionalUrl,
});

export type ProfileInput = z.infer<typeof profileSchema>;