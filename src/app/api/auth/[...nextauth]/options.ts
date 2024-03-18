import type { NextAuthOptions } from "next-auth";
// Providers
import CredentialsProvider from "next-auth/providers/credentials"
// Utils
import { authorize } from "./authorize";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => authorize(credentials),
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXT_PUBLIC_NODE_ENV == 'development',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return '/dashboard'
    },
  }
}

//TODO - Definir uma page fallback para as rotas privadas
//TODO - Criar o login form

export {
  options
}