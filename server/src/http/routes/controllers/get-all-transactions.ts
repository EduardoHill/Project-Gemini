import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma.ts'
import z from 'zod'

const schemaBodyQuery = z.object({
  pageIndex: z.string().optional(),
  name: z.string().optional(),
  categories: z.string().optional(),
})

export async function getAllTransactions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { pageIndex, name, categories } = schemaBodyQuery.parse(request.query)

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

    return reply.status(200).send({
      transactions,
      metas: {
        pages,
        totalCount,
        pageIndex,
      },
    })
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
