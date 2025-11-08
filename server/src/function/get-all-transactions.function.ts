import { prisma } from '../lib/prisma.ts'

interface schemaBodyQuery {
  pageIndex?: string
  name?: string
  categories?: string
}

export async function getAllTransactionsFunction({
  categories,
  name,
  pageIndex,
}: schemaBodyQuery) {
  const transactions = await prisma.transaction.findMany({
    where: {
      name: {
        contains: name,
      },
      categories: {
        contains: categories,
      },
    },

    skip: Number(pageIndex) * 3,
    take: 3,

    orderBy: {
      date: 'desc',
    },
  })

  const totalCount = await prisma.transaction.count({
    where: {
      name: {
        contains: name,
      },
      categories: {
        contains: categories,
      },
    },
  })

  const pages = Math.ceil(totalCount / 3) || 1

  return {
    transactions,
    metas: {
      pages,
      totalCount,
      pageIndex,
    },
  }
}
