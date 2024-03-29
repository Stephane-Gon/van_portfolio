import React from 'react';
import { getServerSession } from 'next-auth';

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session) {
    await import('next/navigation').then(({ redirect }) => {
      redirect('/dashboard');
    });
  }

  return <div>{children}</div>;
}
