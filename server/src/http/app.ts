import fastify from 'fastify'
import { appRoutes } from './routes/app-routes.ts'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(appRoutes)
