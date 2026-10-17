
import { z } from "zod";

export const goalTitleSchema = z
  .string()
  .trim()
  .min(1, "Goal title is required.")
  .max(120, "Goal title cannot exceed 120 characters.");
