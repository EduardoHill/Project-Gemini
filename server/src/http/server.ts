import { app } from './app.ts'

app
  .listen({
    port: 8080,
  })
  .then(() => {
    console.log('Server is running on http://localhost:8080')
  })
