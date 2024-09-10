import {z} from 'zod';

export const categorySchema = z.object({
    name: z.string(),
    userId: z.number()
});

export type Category = z.input<typeof categorySchema>;