import { createBrowserRouter } from 'react-router-dom'
import { App } from '../app'
import { Movimentation } from '../Pages/Movimentation/Page'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/mov',
    element: <Movimentation />,
  },
])
