import { api } from '../lib/axios'

interface CreateTransactionRequest {
  prompt: string
  userId: string
}

export async function createTransaction({
  prompt,
  userId,
}: CreateTransactionRequest) {
  await api.post(`/transactions/${userId}`, {
    prompt,
  })
}
