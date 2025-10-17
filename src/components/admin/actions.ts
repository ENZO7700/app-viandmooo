
'use server';

import { logout as performLogout } from '@/lib/auth';

export async function logout() {
  await performLogout();
}
