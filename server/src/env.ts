import { z } from 'zod'

const envSchema = z.object({
  GEMINI_API_KEY: z.string(),
})

export const env = envSchema.parse({
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
})
