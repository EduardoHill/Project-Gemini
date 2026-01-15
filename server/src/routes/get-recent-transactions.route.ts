import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma.ts'
import { getRecentTransactionsFuncton } from '../function/get-recent-transactions.function.ts'

export const getRecentTransactionsRoute: FastifyPluginCallback = (app) => {
  app.get('/transactions/recent/:userId', async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string }
      const transactions = await getRecentTransactionsFuncton(userId)

      return reply.status(200).send(transactions)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
