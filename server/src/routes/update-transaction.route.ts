import { FastifyPluginCallback } from 'fastify'

import z from 'zod'
import { UpdateTransactionFunction } from '../function/update-transaction.function.ts'

const schemaBody = z.object({
  name: z.string().optional(),
  categories: z.string().optional(),
  type: z.string().optional(),
  amount: z.number().optional(),
})

const schemaParams = z.object({
  id: z.string(),
})

export const updateTransactionRoute: FastifyPluginCallback = (app) => {
  app.put('/update-transaction/:id', async (request, reply) => {
    try {
      const { amount, categories, name, type } = schemaBody.parse(request.body)
      const { id } = schemaParams.parse(request.params)

      const { message } = await UpdateTransactionFunction({
        id,
        amount,
        categories,
        name,
        type,
      })
      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
