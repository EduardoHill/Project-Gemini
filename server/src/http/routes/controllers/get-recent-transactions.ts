import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma.ts'

export async function getRecentTransactions(
  requets: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: 'desc',
      },

      take: 4,
    })

    return reply.status(200).send({
      transactions,
    })
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
