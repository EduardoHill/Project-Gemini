import { FastifyInstance } from 'fastify'
import { createTransaction } from './create-transaction.ts'

import { getRecentTransactionsRoute } from './get-recent-transactions.route.ts'
import { getAllTransactionsRoute } from './get-all-transactions.route.ts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/transactions', createTransaction)
  app.register(getRecentTransactionsRoute)
  app.register(getAllTransactionsRoute)
}
