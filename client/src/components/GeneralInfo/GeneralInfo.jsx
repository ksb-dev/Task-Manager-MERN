/* eslint-disable no-unused-vars */
// context
import { useTaskivityContext } from '../../context/context'

// components
import SearchBar from '../SearchBar/SearchBar'
import ProgressBar from '../ProgressBar/ProgressBar'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn'

// images
import profileImg from '../../images/profile.png'

// react-icons
import { HiOutlinePlusSmall } from 'react-icons/hi2'

const GeneralInfo = () => {
  const user = localStorage.getItem('userName')
  const { mode } = useTaskivityContext()

  return (
    <div
      className={
        'general-info ' + (mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor')
      }
    >
      <p className='user'>{user && <span>Welcome {user}</span>}</p>

      <div className='image-search-progress-container'>
        <img src={profileImg} alt='profile-img' />

        <div className='search-container-1'>
          {window.location.pathname !== '/create' &&
            !window.location.pathname.includes('/edit') && <SearchBar />}
        </div>

        <ProgressBar />
      </div>

      <div className='search-container-2'>
        {window.location.pathname !== '/create' &&
          !window.location.pathname.includes('/edit') && <SearchBar />}
      </div>

      {window.location.pathname !== '/create' &&
        !window.location.pathname.includes('/edit') && (
          <PrimaryBtn
            path={'/create'}
            icon={<HiOutlinePlusSmall />}
            text={'Create New Task'}
          />
        )}
    </div>
  )
}

export default GeneralInfo
