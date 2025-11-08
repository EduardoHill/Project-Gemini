import { FastifyInstance } from 'fastify'

import { getRecentTransactionsRoute } from './get-recent-transactions.route.ts'
import { getAllTransactionsRoute } from './get-all-transactions.route.ts'
import { createTransactionRoute } from './create-transaction.ts'
import { updateTransactionRoute } from './update-transaction.route.ts'

export async function appRoutes(app: FastifyInstance) {
  app.register(createTransactionRoute)
  app.register(getRecentTransactionsRoute)
  app.register(getAllTransactionsRoute)
  app.register(updateTransactionRoute)
}
