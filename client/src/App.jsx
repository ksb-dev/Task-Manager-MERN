// react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// react-hot-toast
import { Toaster } from 'react-hot-toast'

// context
import { useTaskivityContext } from './context/context'

// pages
import Home from './pages/Home/Home'
import Create from './pages/Create/Create'
import Edit from './pages/Edit/Edit'
import Complete from './pages/Complete/Complete'
import Incomplete from './pages/Incomplete/Incomplete'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Logout from './pages/Logout/Logout'
import TaskDetail from './pages/TaskDetail/TaskDetail'

// components
import Navbar from './components/Navbar/Navbar'

import './app.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0
  }
})

const App = () => {
  const { mode } = useTaskivityContext()

  return (
    <div className={'app ' + (mode ? 'lightBg1' : 'darkBg2')}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/complete' element={<Complete />} />
            <Route path='/Incomplete' element={<Incomplete />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/detail/:id' element={<TaskDetail />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 5000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'rgb(0,0,0,0.9)',
              color: 'white'
            }
          }}
        />
      </QueryClientProvider>
    </div>
  )
}

export default App
