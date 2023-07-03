/* eslint-disable no-unused-vars */
// react-icons
import { BiArrowBack, BiLogOutCircle } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// react-hot-toast
import { toast } from 'react-hot-toast'

// context
import { useTaskivityContext } from '../../context/context'

const Logout = () => {
  const { rerenderNavBar, setRerenderNavBar, mode } = useTaskivityContext()
  const navigate = useNavigate()

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
      {/* <p>Logout / Delete</p> */}

      <div className='logoutBtn-1' onClick={handleLogout}>
        <span className='logout-icon-1'>
          <BiLogOutCircle />
        </span>
        Logout
      </div>

      <div className='logoutBtn-2'>
        <span className='logout-icon-2'>
          <RiDeleteBin6Line />
        </span>
        Delete Account
      </div>
    </div>
  )
}

export default Logout
