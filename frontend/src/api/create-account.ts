import { api } from '../lib/axios'

interface CreateAccountRequest {
  name: string
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
}

interface CreateAccountResponse {
  user: User
}

export async function createAccount(
  data: CreateAccountRequest
): Promise<CreateAccountResponse> {
  const response = await api.post<CreateAccountResponse>(
    '/create-account',
    data
  )
  return response.data
}
