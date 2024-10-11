import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: 'Mande um email válido' }),
    password: z.string().min(6, { message: 'No minimo 6 caracteres na senha!' })
})

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
})