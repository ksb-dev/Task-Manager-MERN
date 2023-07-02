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

// components
import Navbar from './components/Navbar/Navbar'
//import GeneralInfo from './components/GeneralInfo/GeneralInfo'
//import Categories from './components/Categories/Categories'

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
          </Routes>
        </BrowserRouter>

        <Toaster
          position='bottom-center'
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
