// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import PathFinder from "@/lib/PathFinder";

export const logoUrlSchema = zfd.text(
  z
    .string()
    .trim()
    .min(1, { message: "Kindly include the URL for the logo" })
    .default("")
    .refine((val) => PathFinder.schemaRefineImageUrl(val), { message: "This URL is invalid; only images from {unsplash.com} are allowed at this time" }),
);
