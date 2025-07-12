import { z } from "zod";

// ✅ Create Category Schema
export const createCategorySchema = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export type TCreateCategory = z.infer<typeof createCategorySchema>;
