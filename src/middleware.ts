export { default } from 'next-auth/middleware';

// We must set the same secret in the middleware that you use in NextAuth.
// The easiest way is to set the NEXTAUTH_SECRET environment variable.
export const config = {
  matcher: ['/dashboard', '/tools'],
};
