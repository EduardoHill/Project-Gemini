import { createBrowserRouter } from 'react-router-dom'
import { App } from '../app'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])
