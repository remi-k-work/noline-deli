// other libraries
import { z } from "zod";
import PathFinder from "@/lib/PathFinder";

export const logoUrlSchema = z
  .string()
  .trim()
  .min(1, { message: "Kindly include the URL for the logo" })
  .refine((val) => PathFinder.schemaRefineImageUrl(val), { message: "This URL is invalid; only images from {unsplash.com} are allowed at this time" });
