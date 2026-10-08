import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

/**
 * Checks server-side session for an authenticated user with 'admin' role.
 * Returns true if user is authenticated and is an admin, false otherwise.
 */
export async function requireAdmin(): Promise<boolean> {
  try {
    const headerList = await headers();
    const session = await auth.api.getSession({
      headers: headerList,
    });
    return session?.user?.role === 'admin';
  } catch (error) {
    console.error('requireAdmin error:', error);
    return false;
  }
}
