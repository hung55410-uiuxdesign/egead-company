import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type {
  ContactInquiry,
  ContactInquiryInput,
  ContactInquiryStatus,
  ContactStats,
} from '@/types/contact';

/**
 * Map Prisma record to ContactInquiry
 */
function mapRecord(item: any): ContactInquiry {
  return {
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    fullName: item.fullName || `${item.lastName} ${item.firstName}`.trim(),
    company: item.company,
    email: item.email,
    phone: item.phone || '',
    region: item.region,
    message: item.message,
    status: (item.status as ContactInquiryStatus) || 'new',
    notes: item.notes || '',
    createdAt:
      item.createdAt instanceof Date
        ? item.createdAt.toISOString()
        : new Date(item.createdAt).toISOString(),
    updatedAt:
      item.updatedAt instanceof Date
        ? item.updatedAt.toISOString()
        : new Date(item.updatedAt).toISOString(),
  };
}

/**
 * Get all inquiries with optional filters
 */
export async function getAllContactInquiries(filters?: {
  status?: string;
  search?: string;
  region?: string;
}): Promise<ContactInquiry[]> {
  const where: Prisma.ContactInquiryWhereInput = {};

  if (filters?.status && filters.status !== 'all') {
    where.status = filters.status;
  }
  if (filters?.region && filters.region !== 'all') {
    where.region = filters.region;
  }
  if (filters?.search && filters.search.trim()) {
    const query = filters.search.trim();
    where.OR = [
      { firstName: { contains: query, mode: 'insensitive' } },
      { lastName: { contains: query, mode: 'insensitive' } },
      { fullName: { contains: query, mode: 'insensitive' } },
      { email: { contains: query, mode: 'insensitive' } },
      { company: { contains: query, mode: 'insensitive' } },
      { phone: { contains: query, mode: 'insensitive' } },
      { message: { contains: query, mode: 'insensitive' } },
    ];
  }

  const records = await prisma.contactInquiry.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return records.map(mapRecord);
}

/**
 * Get single inquiry by ID
 */
export async function getContactInquiryById(
  id: string
): Promise<ContactInquiry | null> {
  const record = await prisma.contactInquiry.findUnique({
    where: { id },
  });
  return record ? mapRecord(record) : null;
}

/**
 * Submit new contact inquiry
 */
export async function submitContactInquiry(
  data: ContactInquiryInput
): Promise<ContactInquiry> {
  const fullName = `${data.lastName} ${data.firstName}`.trim();

  const record = await prisma.contactInquiry.create({
    data: {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      fullName,
      company: data.company?.trim() || '',
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      region: data.region?.trim() || 'Vietnam',
      message: data.message.trim(),
      status: 'new',
    },
  });

  return mapRecord(record);
}

/**
 * Update inquiry status
 */
export async function updateContactInquiryStatus(
  id: string,
  status: ContactInquiryStatus
): Promise<ContactInquiry | null> {
  try {
    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
    return mapRecord(updated);
  } catch {
    return null;
  }
}

/**
 * Update inquiry notes
 */
export async function updateContactInquiryNotes(
  id: string,
  notes: string,
  status?: ContactInquiryStatus
): Promise<ContactInquiry | null> {
  try {
    const updateData: Prisma.ContactInquiryUpdateInput = {
      notes,
      updatedAt: new Date(),
    };
    if (status) updateData.status = status;

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: updateData,
    });
    return mapRecord(updated);
  } catch {
    return null;
  }
}

/**
 * Delete inquiry
 */
export async function deleteContactInquiry(id: string): Promise<boolean> {
  try {
    await prisma.contactInquiry.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get inquiry stats for dashboard / admin widgets
 */
export async function getContactStats(): Promise<ContactStats> {
  const [total, newCount, contactedCount, resolvedCount, archivedCount] =
    await Promise.all([
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { status: 'new' } }),
      prisma.contactInquiry.count({ where: { status: 'contacted' } }),
      prisma.contactInquiry.count({ where: { status: 'resolved' } }),
      prisma.contactInquiry.count({ where: { status: 'archived' } }),
    ]);

  return {
    total,
    newCount,
    contactedCount,
    resolvedCount,
    archivedCount,
  };
}
