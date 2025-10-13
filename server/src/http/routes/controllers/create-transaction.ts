import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { transactionGenerateIa } from '../../../services/gemini.ts'
import { prisma } from '../../../lib/prisma.ts'

const schemaBodyRequest = z.object({
  prompt: z.string(),
})

const schemaBodyResponse = z.object({
  name: z.string(),
  categories: z.string(),
  type: z.string(),
  amount: z.number(),
})

export async function createTransaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { prompt } = schemaBodyRequest.parse(request.body)

    const aiResponse = await transactionGenerateIa(prompt)

    const aiData = aiResponse.replace(/```json\n|\n```/g, '')

    const { name, categories, type, amount } = JSON.parse(aiData) as z.infer<
      typeof schemaBodyResponse
    >

    const transaction = await prisma.transaction.create({
      data: {
        name,
        categories,
        type,
        amount,
      },
    })

    return reply.status(201).send({
      transaction,
    })
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
