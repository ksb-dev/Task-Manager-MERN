/* eslint-disable no-unused-vars */
import { useState } from 'react'

// axios
import axios from 'axios'

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
  const [image, setImage] = useState('')
  const { mode, rerenderNavBar, setRerenderNavBar } = useTaskivityContext()
  const navigate = useNavigate()

  //const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: signup,

    onSuccess: data => {
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('token', data.token)
      localStorage.setItem('profilePath', data.image)

      setRerenderNavBar(!rerenderNavBar)

      toast.success(`Registration Successful.`)

      navigate('/')
    },
    onError: data => {
      toast.error(data.response.data.message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    registerMutation.mutate({ name, email, password, image })
  }

  const uploadImage = async e => {
    const imageFile = e.target.files[0]
    const formData = new FormData()
    formData.append('image', imageFile)

    try {
      const data = await axios.post(`/url/api/v1/profile/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data) {
        setImage(data.data.image.src)
      }
    } catch (error) {
      toast.success(error.response.data.message)
    }
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

        <div className='profile-upload'>
          <span>Upload profile picture</span>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={uploadImage}
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
