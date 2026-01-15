import { api } from '../lib/axios'

interface GetTransactionsRecentResponse {
  transactions: {
    id: string
    name: string
    categories: string
    amount: number
    type: 'expense' | 'revenue'
    date: string
  }[]
}

export async function getTransactionsRecent(userId: string) {
  const response = await api.get<GetTransactionsRecentResponse>(
    `/transactions/recent/${userId}`
  )

  return response.data
}
