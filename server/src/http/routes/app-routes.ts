import { FastifyInstance } from 'fastify'
import { createTransaction } from './controllers/creat-transaction.ts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/transaction', createTransaction)
}
