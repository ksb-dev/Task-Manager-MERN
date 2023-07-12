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
        'dashboard ' + (mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor')
      }
    >
      {user && (
        <p className='user-name'>
          Welcome
          <span
            style={{
              marginLeft: '0.25rem'
            }}
          >
            {user.charAt(0).toUpperCase() + user.substring(1)}
          </span>
          !
        </p>
      )}

      <div className='image-search-progress'>
        <img src={profileImg} alt='profile-img' />

        <div className='search-gt-640px'>
          <SearchBar />
        </div>

        <ProgressBar />
      </div>

      <div className='search-st-640px'>
        <SearchBar />
      </div>

      <PrimaryBtn
        path={'/create'}
        icon={<HiOutlinePlusSmall />}
        text={'Create New Task'}
      />
    </div>
  )
}

export default GeneralInfo
