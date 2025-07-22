import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ca } from 'zod/locales'
import { transactionGenerateIA } from '../../../services/gemini.ts'
import { prisma } from '../../../lib/prisma.ts'

const schemaBodyRequest = z.object({
  prompt: z.string(),
})

const schemaBodyResponse = z.object({
  name: z.string(),
  category: z.string(),
  type: z.string(),
  amount: z.number(),
})

export async function createTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { prompt } = schemaBodyRequest.parse(request.body)

    const iaResponse = await transactionGenerateIA(prompt)

    const iaData = iaResponse.replace(/```json\n|\n```/g, '')

    const { name, category, type, amount } = JSON.parse(iaData) as z.infer<
      typeof schemaBodyResponse
    >

    const transaction = await prisma.transaction.create({
      data: {
        name,
        category,
        type,
        amount,
      },
    })

    return reply.status(201).send({
      transaction,
    })
  } catch (error) {
    if (error) {
      console.error(error)
    }
  }
}
