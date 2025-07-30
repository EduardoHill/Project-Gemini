import { FastifyInstance } from 'fastify'
import { createTransaction } from './controllers/creat-transaction.ts'

import { getRecentTransaction } from './controllers/get-recent-transaction.ts'
import { getAllTransactions } from './controllers/get-all-transactions.ts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/transaction', createTransaction)

  app.get('/transaction/recent', getRecentTransaction)

  app.get('/transaction', getAllTransactions)
}
