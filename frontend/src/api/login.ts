import { api } from '../lib/axios'

interface LoginRequest {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
}

interface LoginResponse {
  user: User
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/login', data)
  return response.data
}
