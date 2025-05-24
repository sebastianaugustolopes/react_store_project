import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GamePage from './components/Pages/GamePage/GamePage.tsx'
import HomePage from './components/Pages/HomePage.tsx'

const App = () => {
  const rotas = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/jogo/:id',
      element: <GamePage />,
    },
  ])

  return <RouterProvider router={rotas} />
}

export default App
