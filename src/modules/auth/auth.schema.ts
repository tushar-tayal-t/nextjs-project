import {z} from "zod";

export const loginUserSchema = z.object({
  password: z.string().min(2),
  email: z.string().email()
});

export type loginUserType = z.infer<typeof loginUserSchema>;