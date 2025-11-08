import { prisma } from '../lib/prisma.ts'

interface UpdateTransactionProps {
  name?: string
  categories?: string
  type?: string
  amount?: number
  id: string
}

export async function UpdateTransactionFunction({
  amount,
  categories,
  name,
  type,
  id,
}: UpdateTransactionProps) {
  await prisma.transaction.update({
    where: { id },
    data: {
      amount,
      categories,
      name,
      type,
    },
  })

  return {
    message: 'transaction atualizada com sucesso',
  }
}
