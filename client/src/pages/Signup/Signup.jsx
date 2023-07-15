/* eslint-disable no-unused-vars */
import { useState } from 'react'

// axios
import axios from 'axios'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-icons
import { BiArrowBack, BiUserPlus } from 'react-icons/bi'

// tanstack-query
import { useMutation } from '@tanstack/react-query'

// api
import { signup } from '../../services/authentication'

//react-router-dom
import { useNavigate } from 'react-router-dom'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'
import Loading from '../../components/Loading/Loading'

// context
import { useTaskivityContext } from '../../context/context'

//const url = '/url/api/v1/profile/upload/cloud'
const url = '/api/v1/profile/upload/cloud'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
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

  const handleSubmit = async e => {
    e.preventDefault()

    if (name !== '' && email !== '' && password !== '') {
      const result = await uploadImage()

      if (result) {
        console.log(true)
        registerMutation.mutate({
          name,
          email,
          password,
          image: result.data.secure_url
        })
      }
    } else {
      toast.error('Please fill out all the fields.')
    }
  }

  const previewFiles = image => {
    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleChange = e => {
    const image = e.target.files[0]
    previewFiles(image)
  }

  const uploadImage = async () => {
    try {
      setIsUploading(true)
      const result = await axios.post(url, {
        image
      })
      if (result) {
        setImage(result.data.secure_url)
        toast.success('Picture uploaded!')
        setIsUploading(false)
        return result
      }
    } catch (err) {
      setIsUploading(false)
      console.log(err)
      toast.error(
        err.response.data.message.charAt(0).toUpperCase() +
          err.response.data.message.substring(1)
      )
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
          <p>Picture</p>
          <div>
            <input
              type='file'
              id='image'
              accept='image/*'
              onChange={e => handleChange(e)}
            />
            {isUploading && (
              <p>
                <span>Picture Uploading</span> <Loading value={'light'} />
              </p>
            )}
          </div>
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
