import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Tên chuyên mục phải có ít nhất 2 ký tự')
    .max(100, 'Tên chuyên mục không quá 100 ký tự'),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug phải có ít nhất 2 ký tự')
    .max(100, 'Slug không quá 100 ký tự')
    .regex(/^[a-z0-9-]+$/, 'Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang (-)'),
  description: z.string().trim().max(500, 'Mô tả không quá 500 ký tự').optional().nullable(),
  icon: z.string().trim().optional().nullable(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
