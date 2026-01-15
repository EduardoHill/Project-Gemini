import { prisma } from '../lib/prisma.ts'

interface createAccountProps {
  name: string
  email: string
  password: string
}

export async function createUserAccount({
  name,
  email,
  password,
}: createAccountProps) {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    throw new Error('User with this email already exists.')
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  return user
}
