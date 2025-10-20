
'use server';

import { getIronSession, type IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sessionOptions, type SessionData } from '@/lib/session';

import { initializeFirebase } from '@/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';


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
    
    // This is a simplified validation for the example.
    // In a real application, you would use Firebase Admin SDK to verify the user
    // or handle the session based on a token sent from the client.
    if (
        credentials.email !== process.env.ADMIN_EMAIL ||
        credentials.password !== process.env.ADMIN_PASSWORD
    ) {
        return { success: false, error: 'Nesprávny email alebo heslo.' };
    }

    try {
        const session = await getSession();
        
        session.isLoggedIn = true;
        
        if (credentials.remember) {
            // The maxAge is set in sessionOptions, but can be overridden here
            // for "remember me" functionality. Let's make it 30 days.
            session.cookieOptions.maxAge = 60 * 60 * 24 * 30;
        } else {
            // Session cookie, expires when the browser is closed.
            session.cookieOptions.maxAge = undefined;
        }
        
        await session.save();
        
    } catch (error) {
         return { success: false, error: 'Nastala neočakávaná chyba pri vytváraní session.' };
    }

    // Redirect to admin dashboard on successful login
    redirect('/admin');
}


export async function loginWithGoogle() {
    // This server action is a placeholder to demonstrate the flow.
    // The actual OAuth redirect would be initiated from the client,
    // which would then call a server endpoint/callback with the token.
    // For this setup, we'll redirect to a conceptual API route
    // that would handle the Firebase logic.
    redirect('/api/auth/google');
}


export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
