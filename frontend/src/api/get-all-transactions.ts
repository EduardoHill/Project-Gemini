import { api } from '../lib/axios'

interface GetAllTransactionsResponse {
  transactions: {
    id: string
    name: string
    categories: string
    amount: number
    type: 'expense' | 'revenue'
    date: string
  }[]

  metas: {
    totalCount: number
    perPage: number
    pages: number
  }
}

interface GetAllTransactionsRequest {
  pageIndex: number | null
  name: string | null
  categories: string | null
  userId: string
}

export async function getAllTransactions({
  pageIndex,
  name,
  categories,
  userId,
}: GetAllTransactionsRequest) {
  const response = await api.get<GetAllTransactionsResponse>(
    `/transactions-all/${userId}`,
    {
      params: {
        pageIndex,
        name,
        categories,
      },
    }
  )

  return response.data
}
