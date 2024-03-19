type AuthorizeProps = {
  email: string;
  password: string;
} | undefined

export const authorize = async (credentials: AuthorizeProps) => {
  // Check if both inputs where filled
  if(!credentials || !credentials.email || !credentials.password) {
    throw new Error('Fields missing.')
  }

  // Check if user exists
  if(credentials.email !== process.env.NEXT_PUBLIC_LOGIN_EMAIL) {
    throw new Error('Wrong email!')
  }

  if(credentials.password !== process.env.NEXT_PUBLIC_LOGIN_PASSWORD) {
    throw new Error('Wrong password!')
  }

  return {
    id: "1",
    email: process.env.NEXT_PUBLIC_LOGIN_EMAIL,
    name: 'Stéphane',
  }
}