import { z } from 'zod';

export const transactionSchema = z.object({
    amount: z.number(),
    description: z.string().nullable(),
    date: z.string().nullable(),
    categoryId: z.number(),
    userId: z.number(),
    type: z.enum(["withdrawal", "deposit"])
});

export type Transaction = z.input<typeof transactionSchema>;