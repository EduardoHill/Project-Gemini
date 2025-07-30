import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../../lib/prisma.ts'

export async function getRecentTransaction(
  requests: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const transaction = await prisma.transaction.findMany({
      orderBy: {
        date: 'desc',
      },

      take: 4,
    })

    return reply.status(200).send({
      transaction,
    })
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
