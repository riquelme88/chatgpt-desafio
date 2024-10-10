import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email()
})

export const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional()
})