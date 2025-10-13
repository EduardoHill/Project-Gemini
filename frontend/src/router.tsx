import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Transactions } from './pages/transactions'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/transacoes',
    element: <Transactions />,
  },
])
