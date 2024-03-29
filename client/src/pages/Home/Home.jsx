/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */

// tanstack Query
import { useQuery } from '@tanstack/react-query'

// services
import { getAllTasks } from '../../services/tasks'

// components
import GeneralInfo from '../../components/GeneralInfo/GeneralInfo'
import Task from '../../components/Task/Task'
import Loading from '../../components/Loading/Loading'
import Categories from '../../components/Categories/Categories'
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'
import SearchModal from '../../components/SearchModal/SearchModal'

// react-icons
import { BiLogoMongodb } from 'react-icons/bi'
import { SiExpress, SiReactquery } from 'react-icons/si'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { HiOutlinePlusSmall } from 'react-icons/hi2'
import { LiaSass } from 'react-icons/lia'

// context
import { useTaskivityContext } from '../../context/context'

// react-router-dom
import { Link } from 'react-router-dom'

const Home = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('userName')

  const { mode } = useTaskivityContext()

  const { isLoading, isError, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => token && getAllTasks(token)
  })

  const handleLoading = () => {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  const handleError = () => {
    return <div className='loading'>Failed to fetch tasks</div>
  }

  const Icon = ({ value, icon }) => {
    return (
      <div>
        <p className={value}>
          <span className={`${value}-icon`}>{icon}</span>
        </p>
        {/* MongoDB */}
      </div>
    )
  }

  return (
    <div className='home'>
      {isLoading && handleLoading()}
      {!isLoading && !token && (
        <div className={'main ' + (mode ? 'darkColor' : 'lightColor')}>
          <Link to='/login'>Login / Signup </Link>

          <div className='about'>
            <p>Web technologies used to build this app.</p>
          </div>

          <div className='stack'>
            <Icon value={'mongo'} icon={<BiLogoMongodb />} />
            <Icon value={'express'} icon={<SiExpress />} />
            <Icon value={'react'} icon={<FaReact />} />
            <Icon value={'node'} icon={<FaNodeJs />} />
            <Icon value={'query'} icon={<SiReactquery />} />
            <Icon value={'sass'} icon={<LiaSass />} />
          </div>
        </div>
      )}

      {data && data.tasks.length === 0 && (
        <div className={'main-2 ' + (mode ? 'darkColor' : 'lightColor')}>
          <p>
            Welcome{' '}
            <span style={{ fontWeight: '500' }}>
              {user && user.charAt(0).toUpperCase() + user.substring(1)}!
            </span>{' '}
          </p>
          <p>Start using this web app by clicking below.</p>
          <PrimaryBtn
            path={'/create'}
            icon={<HiOutlinePlusSmall />}
            text={'Create New Task'}
          />
        </div>
      )}

      {data && data.tasks.length !== 0 && (
        <>
          <SearchModal />
          <GeneralInfo />
          <Categories />
          {isLoading && handleLoading()}
          {isError && handleError()}

          <div className='task-list'>
            {data &&
              data.tasks.map(task => <Task task={task} key={task._id} />)}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
