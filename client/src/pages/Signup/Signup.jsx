/* eslint-disable no-unused-vars */
import { useState } from 'react'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-icons
import { BiArrowBack, BiUserPlus } from 'react-icons/bi'

// tanstack-query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// api
import { signup } from '../../services/authentication'

//react-router-dom
import { useNavigate } from 'react-router-dom'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

// context
import { useTaskivityContext } from '../../context/context'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mode } = useTaskivityContext()
  const navigate = useNavigate()

  //const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      toast.success(`Registration Successful.`)

      //   queryClient.invalidateQueries({
      //     queryKey: ['tasks']
      //   })

      //navigate('/')

      console.log(data.token)
    },
    onError: data => {
      toast.error(data.response.data.message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    // if (title === '') {
    //   toast.error('You must enter title.')
    // } else {
    //   createMutation.mutate({ name: title, description, priority })
    // }
    registerMutation.mutate({ name, email, password })
  }

  return (
    <div className='signup-page'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      <form
        onSubmit={handleSubmit}
        className={mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor'}
      >
        <div className='name-field'>
          <span>Name</span>
          <input
            type='text'
            className={mode ? 'lightBg1' : 'darkBg2'}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

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
          icon={<BiUserPlus />}
          text={'Signup'}
          value='btn'
          fn={handleSubmit}
        />
      </form>
    </div>
  )
}

export default Signup
