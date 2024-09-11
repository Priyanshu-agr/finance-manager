import {z} from 'zod';

export const savingsSchema = z.object({
    amount: z.number(),
    date:z.string().datetime(),
    userId: z.number(),
});

export type Savings = z.input<typeof savingsSchema>;