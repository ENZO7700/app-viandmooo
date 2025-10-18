
'use server';

import { getIronSession, type IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sessionOptions, type SessionData } from '@/lib/session';

import { initializeFirebase } from '@/firebase';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

export interface LoginCredentials {
    email?: string | null;
    password?: string | null;
    remember?: boolean;
}

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

export async function login(credentials: LoginCredentials) {
    if (!credentials.email || !credentials.password) {
        return { success: false, error: 'Email a heslo sú povinné.' };
    }

    // This is a mock login. In a real app, you'd use Firebase Auth.
    if (
        credentials.email === 'admin@admin.com' &&
        credentials.password === 'admin'
    ) {
        const session = await getSession();
        session.isLoggedIn = true;
        
        if (credentials.remember) {
            // Set maxAge only when saving the session
            sessionOptions.cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
        } else {
            sessionOptions.cookieOptions.maxAge = undefined; // Session cookie
        }
        
        await session.save();
        
        return { success: true, error: undefined };
    }

    return { success: false, error: 'Nesprávny email alebo heslo.' };
}


export async function loginWithGoogle() {
    try {
        const { auth } = initializeFirebase();
        const provider = new firebase.auth.GoogleAuthProvider();

        // This part is tricky in Server Actions as it's meant for the client.
        // The typical flow is client-side.
        // A server-side alternative would involve more complex OAuth2 flow handling.
        // For a Next.js app, the simplest way is to redirect the user to a page
        // that handles the client-side Firebase logic.
        // However, to contain logic here, we'll simulate the first step.
        // This won't work end-to-end without a callback URL handler.
        
        // This is a simplified example. A full implementation needs a callback route
        // to handle the response from Google, call `getRedirectResult`, and then
        // establish the session.
        // For the purpose of this demo, we'll assume a client-side redirect flow would be used.
        // This function will return a (non-functional) redirect URL to demonstrate the concept.
        
        // This is a placeholder to show the intent. In a real app
        // you would use signInWithRedirect on the client.
        // We'll just return an object to signify the intent to redirect.
        return { url: `/api/auth/google` };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Neznáma chyba.";
        return { url: null, error: errorMessage };
    }
}


export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
