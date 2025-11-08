import { prisma } from '../lib/prisma.ts'

export async function getRecentTransactionsFuncton() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: 'desc',
    },

    take: 4,
  })

  return {
    transactions,
  }
}
