import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import {
  TeamMemberInput,
  TeamMemberUpdateInput,
  HierarchyInput,
  hierarchyInputSchema,
  teamMemberInputSchema,
  teamMemberUpdateSchema,
} from '@/lib/validations/people';
import type { LeaderTeamHierarchy } from '@/components/pages/company/people/leaderTeamData';

export interface PeopleFilter {
  search?: string;
  department?: string;
  isLeader?: boolean;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  quote?: string | null;
  image: string;
  linkedin?: string | null;
  bio: string;
  skills: string[];
  isLeader: boolean;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  hierarchy?: {
    id: string;
    leaderId: string;
    departmentScope: string;
    overview: string;
    childNodes: unknown;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface PeopleStats {
  total: number;
  leaders: number;
  experts: number;
  published: number;
}

function mapMemberToDto(member: any): AdminTeamMember {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    department: member.department,
    location: member.location,
    quote: member.quote,
    image: member.image,
    linkedin: member.linkedin,
    bio: member.bio,
    skills: Array.isArray(member.skills) ? member.skills : [],
    isLeader: Boolean(member.isLeader),
    order: member.order ?? 0,
    status: member.status || 'published',
    createdAt: member.createdAt instanceof Date ? member.createdAt.toISOString() : String(member.createdAt),
    updatedAt: member.updatedAt instanceof Date ? member.updatedAt.toISOString() : String(member.updatedAt),
    hierarchy: member.hierarchy
      ? {
          id: member.hierarchy.id,
          leaderId: member.hierarchy.leaderId,
          departmentScope: member.hierarchy.departmentScope,
          overview: member.hierarchy.overview,
          childNodes: member.hierarchy.childNodes,
          createdAt: member.hierarchy.createdAt instanceof Date ? member.hierarchy.createdAt.toISOString() : String(member.hierarchy.createdAt),
          updatedAt: member.hierarchy.updatedAt instanceof Date ? member.hierarchy.updatedAt.toISOString() : String(member.hierarchy.updatedAt),
        }
      : null,
  };
}

/**
 * Get list of team members with pagination, filters, and keyword search
 */
export async function getTeamMembers(filter?: PeopleFilter): Promise<{
  items: AdminTeamMember[];
  total: number;
  page: number;
  totalPages: number;
}> {
  try {
    const page = Math.max(1, filter?.page ?? 1);
    const limit = filter?.limit && filter.limit > 0 ? filter.limit : 20;
    const skip = (page - 1) * limit;

    const where: Prisma.TeamMemberWhereInput = {};

    if (filter?.status && filter.status !== 'all') {
      where.status = filter.status;
    }

    if (filter?.department && filter.department !== 'all') {
      where.department = filter.department;
    }

    if (filter?.isLeader !== undefined) {
      where.isLeader = filter.isLeader;
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.trim();
      where.OR = [
        { name: { contains: q } },
        { role: { contains: q } },
        { location: { contains: q } },
        { skills: { string_contains: q } },
      ];
    }

    const [total, rawItems] = await Promise.all([
      prisma.teamMember.count({ where }),
      prisma.teamMember.findMany({
        where,
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        skip,
        take: limit,
        include: {
          hierarchy: true,
        },
      }),
    ]);

    const items = rawItems.map(mapMemberToDto);
    const totalPages = Math.ceil(total / limit) || 1;

    return {
      items,
      total,
      page,
      totalPages,
    };
  } catch (error) {
    console.error('Error in getTeamMembers:', error);
    return {
      items: [],
      total: 0,
      page: 1,
      totalPages: 1,
    };
  }
}

/**
 * Get a single team member by ID
 */
export async function getTeamMember(id: string): Promise<AdminTeamMember | null> {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
      include: {
        hierarchy: true,
      },
    });

    if (!member) return null;
    return mapMemberToDto(member);
  } catch (error) {
    console.error(`Error in getTeamMember(${id}):`, error);
    return null;
  }
}

/**
 * Create a new team member
 */
export async function createTeamMember(data: TeamMemberInput): Promise<AdminTeamMember> {
  const validated = teamMemberInputSchema.parse(data);

  const created = await prisma.teamMember.create({
    data: {
      name: validated.name,
      role: validated.role,
      department: validated.department,
      location: validated.location,
      quote: validated.quote ?? null,
      image: validated.image,
      linkedin: validated.linkedin ?? null,
      bio: validated.bio,
      skills: validated.skills as Prisma.InputJsonValue,
      isLeader: validated.isLeader,
      order: validated.order,
      status: validated.status,
    },
    include: {
      hierarchy: true,
    },
  });

  return mapMemberToDto(created);
}

/**
 * Update an existing team member
 */
export async function updateTeamMember(
  id: string,
  data: TeamMemberUpdateInput
): Promise<AdminTeamMember> {
  const validated = teamMemberUpdateSchema.parse(data);

  const updated = await prisma.teamMember.update({
    where: { id },
    data: {
      ...(validated.name !== undefined && { name: validated.name }),
      ...(validated.role !== undefined && { role: validated.role }),
      ...(validated.department !== undefined && { department: validated.department }),
      ...(validated.location !== undefined && { location: validated.location }),
      ...(validated.quote !== undefined && { quote: validated.quote }),
      ...(validated.image !== undefined && { image: validated.image }),
      ...(validated.linkedin !== undefined && { linkedin: validated.linkedin }),
      ...(validated.bio !== undefined && { bio: validated.bio }),
      ...(validated.skills !== undefined && { skills: validated.skills as Prisma.InputJsonValue }),
      ...(validated.isLeader !== undefined && { isLeader: validated.isLeader }),
      ...(validated.order !== undefined && { order: validated.order }),
      ...(validated.status !== undefined && { status: validated.status }),
    },
    include: {
      hierarchy: true,
    },
  });

  return mapMemberToDto(updated);
}

/**
 * Delete a team member by ID (cascades to hierarchy)
 */
export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error(`Error deleting team member ${id}:`, error);
    throw error;
  }
}

/**
 * Get aggregated statistics for dashboard/list view
 */
export async function getPeopleStats(): Promise<PeopleStats> {
  try {
    const [total, leaders, published] = await Promise.all([
      prisma.teamMember.count(),
      prisma.teamMember.count({ where: { isLeader: true } }),
      prisma.teamMember.count({ where: { status: 'published' } }),
    ]);

    return {
      total,
      leaders,
      experts: total - leaders,
      published,
    };
  } catch (error) {
    console.error('Error in getPeopleStats:', error);
    return {
      total: 0,
      leaders: 0,
      experts: 0,
      published: 0,
    };
  }
}

/**
 * Get hierarchy for a specific leader
 */
export async function getHierarchy(leaderId: string): Promise<{
  id: string;
  leaderId: string;
  departmentScope: string;
  overview: string;
  childNodes: any[];
  createdAt: string;
  updatedAt: string;
} | null> {
  try {
    const hierarchy = await prisma.leaderHierarchy.findUnique({
      where: { leaderId },
    });

    if (!hierarchy) return null;

    return {
      id: hierarchy.id,
      leaderId: hierarchy.leaderId,
      departmentScope: hierarchy.departmentScope,
      overview: hierarchy.overview,
      childNodes: hierarchy.childNodes as any[],
      createdAt: hierarchy.createdAt.toISOString(),
      updatedAt: hierarchy.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error in getHierarchy(${leaderId}):`, error);
    return null;
  }
}

/**
 * Get all hierarchies mapped by leaderId
 */
export async function getAllHierarchies(): Promise<Record<string, LeaderTeamHierarchy>> {
  try {
    const list = await prisma.leaderHierarchy.findMany();
    const result: Record<string, LeaderTeamHierarchy> = {};

    for (const h of list) {
      result[h.leaderId] = {
        leaderId: h.leaderId,
        departmentScope: h.departmentScope,
        overview: h.overview,
        childNodes: h.childNodes as any[],
      };
    }

    return result;
  } catch (error) {
    console.error('Error in getAllHierarchies:', error);
    return {};
  }
}

/**
 * Create or update a leader's hierarchy
 */
export async function upsertHierarchy(data: HierarchyInput): Promise<{
  id: string;
  leaderId: string;
  departmentScope: string;
  overview: string;
  childNodes: any[];
  createdAt: string;
  updatedAt: string;
}> {
  const validated = hierarchyInputSchema.parse(data);

  // Verify leader exists and is marked as leader
  const leader = await prisma.teamMember.findUnique({
    where: { id: validated.leaderId },
  });

  if (!leader) {
    throw new Error(`Không tìm thấy nhân sự có ID ${validated.leaderId}`);
  }

  const upserted = await prisma.leaderHierarchy.upsert({
    where: { leaderId: validated.leaderId },
    create: {
      leaderId: validated.leaderId,
      departmentScope: validated.departmentScope,
      overview: validated.overview,
      childNodes: validated.childNodes as Prisma.InputJsonValue,
    },
    update: {
      departmentScope: validated.departmentScope,
      overview: validated.overview,
      childNodes: validated.childNodes as Prisma.InputJsonValue,
    },
  });

  return {
    id: upserted.id,
    leaderId: upserted.leaderId,
    departmentScope: upserted.departmentScope,
    overview: upserted.overview,
    childNodes: upserted.childNodes as any[],
    createdAt: upserted.createdAt.toISOString(),
    updatedAt: upserted.updatedAt.toISOString(),
  };
}

/**
 * Bulk delete team members by IDs
 */
export async function bulkDeleteTeamMembers(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  // Delete related leader hierarchy records first
  await prisma.leaderHierarchy.deleteMany({
    where: { leaderId: { in: ids } },
  });

  const res = await prisma.teamMember.deleteMany({
    where: { id: { in: ids } },
  });
  return res.count;
}

/**
 * Bulk update team members (status or department) by IDs
 */
export async function bulkUpdateTeamMembers(
  ids: string[],
  data: { status?: 'published' | 'draft' | 'archived'; department?: string }
): Promise<number> {
  if (ids.length === 0) return 0;
  const updateData: { status?: string; department?: string } = {};
  if (data.status) updateData.status = data.status;
  if (data.department) updateData.department = data.department;

  const res = await prisma.teamMember.updateMany({
    where: { id: { in: ids } },
    data: updateData,
  });
  return res.count;
}

