// other libraries
import { z } from "zod";

// types
export interface AllFieldErrors {
  [index: string]: string[] | undefined;
}

export interface FormActionResult {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid" | "denied";
}

// Frequently used schemas serve as building blocks for other schemas and safe action parameters
export const emailSchema = z.string().trim().email();

export const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/);

export const dateSchema = z.coerce.date();

export const priceSchema = z.coerce
  .number()
  .int({ message: "The price must be in cents" })
  .min(1, { message: "A price is required" })
  .max(900000000, { message: "The pricing is excessive" });

export const selectObjectIdSchema = z.union([objectIdSchema, z.literal("*")]).transform((val) => (val === "*" ? undefined : val));
