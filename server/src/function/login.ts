import { prisma } from '../lib/prisma.ts'

interface LoginProps {
  email: string
  password: string
}

export async function loginFunction({ email, password }: LoginProps) {
  const user = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  })

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  return user
}
