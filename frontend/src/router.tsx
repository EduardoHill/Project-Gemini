import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Transactions } from './pages/transactions'
import { LoginPage } from './pages/login'
import { CreateAccountPage } from './pages/create-account'
import { PrivateRoute } from './components/private-route'

export const routes = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/transacoes',
        element: <Transactions />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/criar-conta',
    element: <CreateAccountPage />,
  },
])
