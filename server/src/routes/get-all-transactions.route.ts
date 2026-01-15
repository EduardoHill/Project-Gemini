import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma.ts'
import z from 'zod'
import { getAllTransactionsFunction } from '../function/get-all-transactions.function.ts'

const schemaBodyQuery = z.object({
  pageIndex: z.string().optional(),
  name: z.string().optional(),
  categories: z.string().optional(),
})

const schemaParams = z.object({
  userId: z.string(),
})

export const getAllTransactionsRoute: FastifyPluginCallback = (app) => {
  app.get('/transactions-all/:userId', async (request, reply) => {
    try {
      const { categories, name, pageIndex } = schemaBodyQuery.parse(
        request.query
      )
      const { userId } = schemaParams.parse(request.params)

      const { metas, transactions } = await getAllTransactionsFunction({
        categories,
        name,
        pageIndex,
        userId,
      })

      return reply.status(200).send({ metas, transactions })
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
