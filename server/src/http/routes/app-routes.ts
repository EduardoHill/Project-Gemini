import { FastifyInstance } from 'fastify'
import { createTransaction } from './controllers/create-transaction.ts'
import { getRecentTransactions } from './controllers/get-recent-transactions.ts'
import { getAllTransactions } from './controllers/get-all-transactions.ts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/transactions', createTransaction)
  app.get('/transactions/recent', getRecentTransactions)
  app.get('/transactions-all', getAllTransactions)
}
