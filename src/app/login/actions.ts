
'use server';

import { login as performLogin, type LoginCredentials } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState: { error: string } | undefined, formData: FormData) {
  const credentials: LoginCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = await performLogin(credentials);

  if (result.success) {
    redirect('/admin');
  }

  return { error: result.error };
}
