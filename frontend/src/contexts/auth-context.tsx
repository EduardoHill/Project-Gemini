import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { login as loginApi } from '../api/login'
import { createAccount as createAccountApi } from '../api/create-account'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  createAccount: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('@gemini:user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginApi({ email, password })
    setUser(response.user)
    localStorage.setItem('@gemini:user', JSON.stringify(response.user))
  }, [])

  const createAccount = useCallback(
    async (name: string, email: string, password: string) => {
      const response = await createAccountApi({ name, email, password })
      setUser(response.user)
      localStorage.setItem('@gemini:user', JSON.stringify(response.user))
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('@gemini:user')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        createAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
