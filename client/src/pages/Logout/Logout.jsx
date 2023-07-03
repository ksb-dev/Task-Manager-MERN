/* eslint-disable no-unused-vars */
// react-icons
import { BiArrowBack, BiLogOutCircle } from 'react-icons/bi'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// react-hot-toast
import { toast } from 'react-hot-toast'

// context
import { useTaskivityContext } from '../../context/context'

const Logout = () => {
  const { rerenderNavBar, setRerenderNavBar } = useTaskivityContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('token')

    setRerenderNavBar(!rerenderNavBar)

    toast.success('User logged out')

    //window.location.reload()

    navigate('/')
  }

  return (
    <div className='logout-page'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      <br />
      <PrimaryBtn
        path={'#'}
        icon={<BiLogOutCircle />}
        text={'Logout'}
        value='btn'
        fn={handleLogout}
      />
    </div>
  )
}

export default Logout
