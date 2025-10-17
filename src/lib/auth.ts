
'use server';

import { getIronSession, type IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sessionOptions, type SessionData } from '@/lib/session';

export interface LoginCredentials {
    email?: string | null;
    password?: string | null;
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export async function login(credentials: LoginCredentials) {
    if (!credentials.email || !credentials.password) {
        return { success: false, error: 'Email a heslo sú povinné.' };
    }

    if (
        credentials.email === 'admin@admin.com' &&
        credentials.password === 'admin'
    ) {
        const session = await getSession();
        session.isLoggedIn = true;
        await session.save();
        return { success: true, error: undefined };
    }

    return { success: false, error: 'Nesprávny email alebo heslo.' };
}


export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
