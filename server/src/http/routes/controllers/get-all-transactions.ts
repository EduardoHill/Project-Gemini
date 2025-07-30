import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma.ts'
import z from 'zod'

const schemaBodyQuery = z.object({
  pagIndex: z.string().optional(),
  name: z.string().optional(),
  category: z.string().optional(),
})

export async function getAllTransactions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { pagIndex, name, category } = schemaBodyQuery.parse(request.query)

    const transaction = await prisma.transaction.findMany({
      where: {
        name: {
          contains: name,
        },
        category: {
          contains: category,
        },
      },

      skip: Number(pagIndex) * 10,
      take: 10,
    })

    const totalCount = await prisma.transaction.count({
      where: {
        name: {
          contains: name,
        },
        category: {
          contains: category,
        },
      },
    })

    const pages = Math.ceil(totalCount / 10) || 1

    return reply.status(200).send({
      transaction,
      metas: {
        pages,
        totalCount,
        pagIndex,
      },
    })
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
