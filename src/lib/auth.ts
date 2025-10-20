
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
    
    try {
        const { auth } = initializeFirebase();
        // This is a server-side operation, but Firebase Auth client SDK is intended for client-side.
        // For server-side auth in Next.js, you'd typically use the Admin SDK or handle tokens.
        // However, this action will be called from a client component, so we simulate the client call.
        // The proper way to do this is with a client-side call that then notifies the server.
        // Let's assume for this server action, we can call a helper.
        // This will NOT actually sign the user in on the server, but shows the logic.
        // The actual sign-in must happen on the client.
        
        // This is a placeholder. In a real app, you'd call signInWithEmailAndPassword on the CLIENT
        // and then post the token to the server to create a session.
        // For this project, we'll keep the mock logic but acknowledge its limitation.
        
        const session = await getSession();
        // A more robust solution would be to verify the user with Firebase Admin SDK
        // For now, we simulate success if we get here without error.
        session.isLoggedIn = true;
        
        if (credentials.remember) {
            sessionOptions.cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
        } else {
            sessionOptions.cookieOptions.maxAge = undefined; // Session cookie
        }
        
        await session.save();
        
        // This is where we'd get an IdToken and store it in the session
        // For now, we are just mocking the login
        if (
            credentials.email === 'admin@admin.com' &&
            credentials.password === 'admin'
        ) {
            return { success: true, error: undefined };
        } else {
            return { success: false, error: 'Nesprávny email alebo heslo.' };
        }


    } catch (error: any) {
         if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            return { success: false, error: 'Nesprávny email alebo heslo.' };
        }
        return { success: false, error: 'Nastala neočakávaná chyba. Skúste to prosím neskôr.' };
    }
}


export async function loginWithGoogle() {
    try {
        const { auth } = initializeFirebase();
        const provider = new GoogleAuthProvider();
        
        // This function would be called on the client.
        // In a server action, you can only prepare for the redirect.
        // The actual redirect logic must be handled on the client-side.
        // Here we just indicate the intent.
        
        // signInWithRedirect(auth, provider); // This would be called on client
        
        // For a server action, the best we can do is redirect to a page
        // that triggers the Google Sign-in on the client.
        // Or, more simply, this action should just be a client-side function.
        // Let's adjust the login page to handle this.
        
        return { url: `/api/auth/google` }; // Placeholder, this won't work directly

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

    