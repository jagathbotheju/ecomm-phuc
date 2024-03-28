import { z } from "zod";

export const NewCollectionSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  image: z.string().min(1, "image is required"),
});
