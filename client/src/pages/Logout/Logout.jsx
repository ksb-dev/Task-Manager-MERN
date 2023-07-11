/* eslint-disable no-unused-vars */
import { useState } from 'react'

// react-icons
import { BiArrowBack, BiLogOutCircle } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'

// tanstack-query
import { useMutation } from '@tanstack/react-query'

// api
import { deleteAccount } from '../../services/authentication'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// react-hot-toast
import { toast } from 'react-hot-toast'

// context
import { useTaskivityContext } from '../../context/context'

const Logout = () => {
  const [show, setShow] = useState(false)
  const token = localStorage.getItem('token')
  const { rerenderNavBar, setRerenderNavBar, mode } = useTaskivityContext()
  const navigate = useNavigate()

  const deleteAccountMutation = useMutation({
    mutationFn: () => deleteAccount(token),
    onSuccess: () => {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')

      setRerenderNavBar(!rerenderNavBar)

      toast.success(`Account deleted successfully`)

      navigate('/')
    },
    onError: data => {
      toast.error(data.response.data.message)
    }
  })

  const handleDeleteAccount = e => {
    e.preventDefault()

    deleteAccountMutation.mutate()
  }

  const handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('token')

    setRerenderNavBar(!rerenderNavBar)

    toast.success('User logged out')

    navigate('/')
  }

  return (
    <div className={'logout-page ' + (mode ? 'darkColor' : 'lightColor')}>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />

      <div className='logout-options'>
        <div className='logoutBtn-1' onClick={handleLogout}>
          <span className='logout-icon-1'>
            <BiLogOutCircle />
          </span>
          Logout
        </div>

        <div className='logoutBtn-2' onClick={() => setShow(!show)}>
          <span className='logout-icon-2'>
            <RiDeleteBin6Line />
          </span>
          Delete Account
        </div>
      </div>

      {show && (
        <div className={'confirm ' + (mode ? 'lightBg2' : 'darkBg1')}>
          <p>Do you really want to delete your account permanently ?</p>

          <div className='options'>
            <p className='cancel-btn' onClick={() => setShow(!show)}>
              Cancel
            </p>
            <p className='delete-btn' onClick={handleDeleteAccount}>
              Delete
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Logout
