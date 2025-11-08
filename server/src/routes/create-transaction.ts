import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma.ts'
import { transactionGenerateIa } from '../services/gemini.ts'
import { createTransactionFunction } from '../function/create-transaction.function.ts'

const schemaBodyRequest = z.object({
  prompt: z.string(),
})

export const createTransactionRoute: FastifyPluginCallback = (app) => {
  app.post('/transactions', async (request, reply) => {
    try {
      const { prompt } = schemaBodyRequest.parse(request.body)

      const transaction = await createTransactionFunction({ prompt })

      return reply.status(201).send({
        transaction,
      })
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  })
}
