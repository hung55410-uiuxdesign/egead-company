import { z } from 'zod';

export const DEPARTMENTS = [
  'Executive Leadership',
  'Technology & AI',
  'Commerce & Solutions',
  'Fulfillment & Operations',
  'Delivery & Growth',
] as const;

export const PEOPLE_STATUSES = ['published', 'draft', 'archived'] as const;

export const teamMemberInputSchema = z.object({
  name: z.string().trim().min(1, 'Họ và tên không được để trống'),
  role: z.string().trim().min(1, 'Chức danh / Vai trò không được để trống'),
  department: z.enum(DEPARTMENTS, {
    message: 'Khối phòng ban không hợp lệ',
  }),
  location: z.string().trim().min(1, 'Địa điểm làm việc không được để trống'),
  quote: z.string().trim().optional().nullable(),
  image: z.string().trim().min(1, 'Hình ảnh đại diện không được để trống'),
  linkedin: z.string().trim().optional().nullable(),
  bio: z.string().trim().min(1, 'Tiểu sử tóm tắt không được để trống'),
  skills: z.array(z.string().trim()).default([]),
  isLeader: z.boolean().default(false),
  order: z.number().int().default(0),
  status: z.enum(PEOPLE_STATUSES).default('published'),
});

export const teamMemberUpdateSchema = teamMemberInputSchema.partial();

export const subChildNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    role: z.string().min(1),
    department: z.string().min(1),
    location: z.string().min(1),
    image: z.string().min(1),
    quote: z.string().optional().nullable(),
    skills: z.array(z.string()).default([]),
    responsibility: z.string().default(''),
    linkedin: z.string().optional().nullable(),
    children: z.array(subChildNodeSchema).default([]),
  })
);

export const childNodeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  image: z.string().min(1),
  quote: z.string().optional().nullable(),
  skills: z.array(z.string()).default([]),
  responsibility: z.string().default(''),
  linkedin: z.string().optional().nullable(),
  squadName: z.string().min(1, 'Tên Squad không được để trống'),
  squadFocus: z.string().default(''),
  levelTag: z.string().default('Trưởng nhóm phụ trách / Squad Lead'),
  children: z.array(subChildNodeSchema).default([]),
});

export const childNodesSchema = z.array(childNodeSchema);

export const hierarchyInputSchema = z.object({
  leaderId: z.string().min(1, 'ID Lãnh đạo không được để trống'),
  departmentScope: z.string().trim().min(1, 'Phạm vi phòng ban không được để trống'),
  overview: z.string().trim().min(1, 'Tổng quan chiến lược không được để trống'),
  childNodes: childNodesSchema,
});

export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;
export type TeamMemberUpdateInput = z.infer<typeof teamMemberUpdateSchema>;
export type SubChildNodeInput = z.infer<typeof subChildNodeSchema>;
export type ChildNodeInput = z.infer<typeof childNodeSchema>;
export type HierarchyInput = z.infer<typeof hierarchyInputSchema>;
