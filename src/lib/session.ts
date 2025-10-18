
import type { SessionOptions } from 'iron-session';

export interface SessionData {
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'vi-mo-app-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    // maxAge is undefined by default, meaning it's a session cookie.
    // It will be overridden in the login action if "remember me" is checked.
    maxAge: undefined,
  },
};
