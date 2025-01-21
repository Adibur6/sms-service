import { z } from 'zod';

export const smsSchema = z.object({
    message: z.string().nonempty(),
    recipient: z.string().nonempty()
});

export const emailSchema = z.object({
    subject: z.string().nonempty(),
    body: z.string().nonempty(),
    recipient: z.string().email()
});