
'use server';

import { login as performLogin, loginWithGoogle as performLoginWithGoogle, type LoginCredentials } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState: { error: string } | undefined, formData: FormData) {
  const credentials: LoginCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    remember: formData.get('remember') === 'on',
  }

  const result = await performLogin(credentials);

  if (result.success) {
    redirect('/admin');
  }

  return { error: result.error };
}


export async function loginWithGoogle() {
  const result = await performLoginWithGoogle();

  if (result.url) {
    redirect(result.url);
  } else {
    // In a real app, you'd want to show an error to the user.
    // For now, we'll just redirect to the login page with an error query param.
    redirect('/login?error=Google-login-failed');
  }
}
