import { z } from 'zod';

export const smsSchema = z.object({
    text: z.string().nonempty(),
    phone: z.string().nonempty()
});

export const emailSchema = z.object({
    subject: z.string().nonempty(),
    body: z.string().nonempty(),
    recipient: z.string().email()
});