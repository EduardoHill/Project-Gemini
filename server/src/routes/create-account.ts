import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { createUserAccount } from '../function/create-account.function.ts'

const schemaBodyRequest = z.object({
  name: z.string(),
  password: z.string(),
  email: z.email(),
})

export const createUserAccoutRoute: FastifyPluginCallback = (app) => {
  app.post('/create-account', async (request, reply) => {
    try {
      const { name, email, password } = schemaBodyRequest.parse(request.body)

      const user = await createUserAccount({ name, email, password })

      return reply.status(201).send({ user })
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
