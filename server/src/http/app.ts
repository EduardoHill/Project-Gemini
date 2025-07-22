import fastify from 'fastify'
import { appRoutes } from './routes/app-routes.ts'
import { env } from '../env.ts'

export const app = fastify()

app.register(appRoutes)
