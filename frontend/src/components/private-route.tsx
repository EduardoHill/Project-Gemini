import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className='text-zinc-400'>Carregando...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
