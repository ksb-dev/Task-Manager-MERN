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

// react-icons
import { BiLogoMongodb } from 'react-icons/bi'
import { SiExpress } from 'react-icons/si'
import { FaReact, FaNodeJs } from 'react-icons/fa'

// context
import { useTaskivityContext } from '../../context/context'

const Home = () => {
  const token = localStorage.getItem('token')

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

  const noTasks = () => {
    return <div className='loading'>Please Add Tasks</div>
  }

  return (
    <div className='home'>
      {token ? (
        <>
          <GeneralInfo />
          <Categories />
          {isLoading && handleLoading()}
          {isError && handleError()}
          {data && data.tasks.length === 0 && noTasks()}

          <div className='task-list'>
            {data &&
              data.tasks.map(task => <Task task={task} key={task._id} />)}
          </div>
        </>
      ) : (
        <div className={'main ' + (mode ? 'darkColor' : 'lightColor')}>
          <div className='about'>
            <p>
              Taskivity is a basic task manager web app, built using popular
              <span> MERN </span>stack
            </p>
          </div>

          <div className='stack'>
            <div>
              <p className='mongo'>
                <span className='mongo-icon'>
                  <BiLogoMongodb />
                </span>
              </p>
              MongoDB
            </div>
            <div>
              <p className='express'>
                <span className='express-icon'>
                  <SiExpress />
                </span>
              </p>
              Express.js
            </div>
            <div>
              <p className='react'>
                <span className='react-icon'>
                  <FaReact />
                </span>
              </p>
              React.js
            </div>
            <div>
              <p className='node'>
                <span className='node-icon'>
                  <FaNodeJs />
                </span>
              </p>
              Node.js
            </div>
          </div>

          <div className='functionalities'>
            <p>Functionalities</p>
            <div className='functions'>
              <p>1. CRUD (Create, Read, Delete, Update) operations.</p>
              <p>2. Authentication using JWT (JSON Web Token)</p>
              <p>3. Authentication using google.</p>
              <p>4. Light / Dark mode. </p>
              <p>5. Filter tasks. </p>
              <p>6. Pagination.</p>
              <p>7. Image upload.</p>
              <p>8. Forgot password.</p>
              <p>& more...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
