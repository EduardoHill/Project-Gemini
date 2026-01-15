import { FastifyPluginCallback } from 'fastify'
import z, { email } from 'zod'
import { loginFunction } from '../function/login.ts'

export const schemaBodyRequest = z.object({
  email: z.email(),
  password: z.string(),
})

export const loginRoute: FastifyPluginCallback = (app) => {
  app.post('/login', async (request, reply) => {
    try {
      const { email, password } = schemaBodyRequest.parse(request.body)

      // Here you would typically check the email and password against your database
      // For demonstration purposes, let's assume a simple check
      const user = await loginFunction({ email, password })

      if (user) {
        return reply.status(200).send({ user })
      } else {
        return reply.status(401).send({ message: 'Invalid email or password' })
      }
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
