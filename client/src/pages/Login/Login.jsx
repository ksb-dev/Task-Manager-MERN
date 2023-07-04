/* eslint-disable no-unused-vars */
import { useState } from 'react'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-icons
import { BiArrowBack, BiLogInCircle } from 'react-icons/bi'

// tanstack-query
import { useMutation } from '@tanstack/react-query'

// api
import { login } from '../../services/authentication'

//react-router-dom
import { useNavigate } from 'react-router-dom'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

// context
import { useTaskivityContext } from '../../context/context'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mode, rerenderNavBar, setRerenderNavBar } = useTaskivityContext()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('token', data.token)

      setRerenderNavBar(!rerenderNavBar)

      toast.success(`Login Successful`)

      navigate('/')
    },
    onError: data => {
      toast.error(data.response.data.message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    loginMutation.mutate({ email, password })
  }

  return (
    <div className='login-page'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      <form
        onSubmit={handleSubmit}
        className={mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor'}
      >
        <div className='email-field'>
          <span>Email</span>
          <input
            type='text'
            className={mode ? 'lightBg1' : 'darkBg2'}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='password-field'>
          <span>Password</span>
          <input
            type='password'
            className={mode ? 'lightBg1' : 'darkBg2'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <PrimaryBtn
          path={'#'}
          icon={<BiLogInCircle />}
          text={'Login'}
          value='btn'
          fn={handleSubmit}
          isLoading={loginMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default Login
