import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import type {
  ContactInquiry,
  ContactInquiryInput,
  ContactInquiryStatus,
  ContactStats,
} from '@/types/contact';

const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'contact_inquiries.json');

/**
 * Fallback file reader
 */
async function readJsonInquiries(): Promise<ContactInquiry[]> {
  try {
    const raw = await fs.readFile(JSON_FILE_PATH, 'utf-8');
    const items: ContactInquiry[] = JSON.parse(raw);
    return items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Fallback file writer
 */
async function writeJsonInquiries(items: ContactInquiry[]): Promise<void> {
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing inquiries to JSON:', err);
  }
}

/**
 * Map Prisma record or JSON item to ContactInquiry
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
  try {
    if (prisma && (prisma as any).contactInquiry) {
      const where: any = {};
      if (filters?.status && filters.status !== 'all') {
        where.status = filters.status;
      }
      if (filters?.region && filters.region !== 'all') {
        where.region = filters.region;
      }
      if (filters?.search) {
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

      const records = await (prisma as any).contactInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      return records.map(mapRecord);
    }
  } catch (err) {
    console.warn('Prisma getAllContactInquiries failed, using JSON storage:', err);
  }

  // Fallback to JSON
  let items = await readJsonInquiries();
  if (filters?.status && filters.status !== 'all') {
    items = items.filter((i) => i.status === filters.status);
  }
  if (filters?.region && filters.region !== 'all') {
    items = items.filter((i) => i.region === filters.region);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    items = items.filter(
      (i) =>
        i.fullName.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q) ||
        (i.phone && i.phone.toLowerCase().includes(q)) ||
        i.message.toLowerCase().includes(q)
    );
  }
  return items;
}

/**
 * Get single inquiry by ID
 */
export async function getContactInquiryById(
  id: string
): Promise<ContactInquiry | null> {
  try {
    if (prisma && (prisma as any).contactInquiry) {
      const record = await (prisma as any).contactInquiry.findUnique({
        where: { id },
      });
      if (record) return mapRecord(record);
    }
  } catch (err) {
    console.warn('Prisma getContactInquiryById failed, using JSON storage:', err);
  }

  const items = await readJsonInquiries();
  const found = items.find((i) => i.id === id);
  return found || null;
}

/**
 * Submit new contact inquiry
 */
export async function submitContactInquiry(
  data: ContactInquiryInput
): Promise<ContactInquiry> {
  const fullName = `${data.lastName} ${data.firstName}`.trim();

  let created: ContactInquiry | null = null;

  try {
    if (prisma && (prisma as any).contactInquiry) {
      const record = await (prisma as any).contactInquiry.create({
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
      created = mapRecord(record);
    }
  } catch (err) {
    console.warn('Prisma submitContactInquiry failed, falling back to JSON:', err);
  }

  if (!created) {
    const now = new Date().toISOString();
    created = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      fullName,
      company: data.company?.trim() || '',
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || '',
      region: data.region?.trim() || 'Vietnam',
      message: data.message.trim(),
      status: 'new',
      notes: '',
      createdAt: now,
      updatedAt: now,
    };
  }

  // Backup to JSON file
  const items = await readJsonInquiries();
  items.unshift(created);
  await writeJsonInquiries(items);

  return created;
}

/**
 * Update inquiry status
 */
export async function updateContactInquiryStatus(
  id: string,
  status: ContactInquiryStatus
): Promise<ContactInquiry | null> {
  try {
    if (prisma && (prisma as any).contactInquiry) {
      const updated = await (prisma as any).contactInquiry.update({
        where: { id },
        data: { status, updatedAt: new Date() },
      });
      const result = mapRecord(updated);

      // Sync JSON
      const items = await readJsonInquiries();
      const idx = items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        items[idx].status = status;
        items[idx].updatedAt = result.updatedAt;
        await writeJsonInquiries(items);
      }
      return result;
    }
  } catch (err) {
    console.warn('Prisma updateContactInquiryStatus failed, updating JSON:', err);
  }

  const items = await readJsonInquiries();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;

  items[idx].status = status;
  items[idx].updatedAt = new Date().toISOString();
  await writeJsonInquiries(items);
  return items[idx];
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
    if (prisma && (prisma as any).contactInquiry) {
      const updateData: any = { notes, updatedAt: new Date() };
      if (status) updateData.status = status;

      const updated = await (prisma as any).contactInquiry.update({
        where: { id },
        data: updateData,
      });
      const result = mapRecord(updated);

      // Sync JSON
      const items = await readJsonInquiries();
      const idx = items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        items[idx].notes = notes;
        if (status) items[idx].status = status;
        items[idx].updatedAt = result.updatedAt;
        await writeJsonInquiries(items);
      }
      return result;
    }
  } catch (err) {
    console.warn('Prisma updateContactInquiryNotes failed, updating JSON:', err);
  }

  const items = await readJsonInquiries();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;

  items[idx].notes = notes;
  if (status) items[idx].status = status;
  items[idx].updatedAt = new Date().toISOString();
  await writeJsonInquiries(items);
  return items[idx];
}

/**
 * Delete inquiry
 */
export async function deleteContactInquiry(id: string): Promise<boolean> {
  let deletedFromPrisma = false;
  try {
    if (prisma && (prisma as any).contactInquiry) {
      await (prisma as any).contactInquiry.delete({ where: { id } });
      deletedFromPrisma = true;
    }
  } catch (err) {
    console.warn('Prisma deleteContactInquiry failed:', err);
  }

  const items = await readJsonInquiries();
  const filtered = items.filter((i) => i.id !== id);
  await writeJsonInquiries(filtered);

  return deletedFromPrisma || items.length !== filtered.length;
}

/**
 * Get inquiry stats for dashboard / admin widgets
 */
export async function getContactStats(): Promise<ContactStats> {
  try {
    if (prisma && (prisma as any).contactInquiry) {
      const [total, newCount, contactedCount, resolvedCount, archivedCount] =
        await Promise.all([
          (prisma as any).contactInquiry.count(),
          (prisma as any).contactInquiry.count({ where: { status: 'new' } }),
          (prisma as any).contactInquiry.count({ where: { status: 'contacted' } }),
          (prisma as any).contactInquiry.count({ where: { status: 'resolved' } }),
          (prisma as any).contactInquiry.count({ where: { status: 'archived' } }),
        ]);

      return {
        total,
        newCount,
        contactedCount,
        resolvedCount,
        archivedCount,
      };
    }
  } catch (err) {
    console.warn('Prisma getContactStats failed, using JSON counts:', err);
  }

  const items = await readJsonInquiries();
  return {
    total: items.length,
    newCount: items.filter((i) => i.status === 'new').length,
    contactedCount: items.filter((i) => i.status === 'contacted').length,
    resolvedCount: items.filter((i) => i.status === 'resolved').length,
    archivedCount: items.filter((i) => i.status === 'archived').length,
  };
}
