import z from 'zod'
import { transactionGenerateIa } from '../services/gemini.ts'
import { prisma } from '../lib/prisma.ts'

interface createTransactionProps {
  prompt: string
  userId: string
}

const schemaBodyResponse = z.object({
  name: z.string(),
  categories: z.string(),
  type: z.string(),
  amount: z.number(),
  date: z.date(),
})

export async function createTransactionFunction({
  prompt,
  userId,
}: createTransactionProps) {
  const aiResponse = await transactionGenerateIa(prompt)

  const aiData = aiResponse.replace(/```json\n|\n```/g, '')

  const { name, categories, type, amount, date } = JSON.parse(
    aiData
  ) as z.infer<typeof schemaBodyResponse>

  const finalDate = date
    ? new Date(date).toISOString()
    : new Date().toISOString()

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      name,
      categories,
      type,
      amount,
      date: finalDate,
    },
  })

  return transaction
}
