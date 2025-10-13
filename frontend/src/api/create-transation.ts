import { api } from '../lib/axios'

interface GetTransactionsRequest {
  prompt: string
}

export async function createTransaction({ prompt }: GetTransactionsRequest) {
  await api.post('/transactions', {
    prompt,
  })
}
