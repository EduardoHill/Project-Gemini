import { prisma } from '../lib/prisma.ts'

export async function getRecentTransactionsFuncton(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: { equals: userId },
    },
    orderBy: {
      date: 'desc',
    },
    take: 4,
  })

  return {
    transactions,
  }
}
