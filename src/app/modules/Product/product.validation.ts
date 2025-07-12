// src/schemas/product.schema.ts
import { z } from "zod";

// Enum for status
const productStatusEnum = z.enum(["In Stock", "Stock Out"]);

// ✅ Create Product Schema
export const createProductSchema = z.object({
  name: z
    .string({ message: "Product name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  price: z
    .number({ message: "Price is required" })
    .positive("Price must be a positive number"),

  discount: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%")
    .default(0),

  imageUrl: z
    .string({ message: "Image URL is required" })
    .url("Must be a valid image URL"),

  status: productStatusEnum.default("In Stock"),

  productCode: z.string().optional(), // This will be set in the service

  category: z
    .string({ message: "Category ID is required" })
    .min(1, "Category ID must be a non-empty string"),
});

// ✅ Update Product Schema (for PATCH)
export const updateProductSchema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),

  discount: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%")
    .optional(),

  status: productStatusEnum.optional(),
});

export type TCreateProduct = z.infer<typeof createProductSchema>;
export type TUpdateProduct = z.infer<typeof updateProductSchema>;
