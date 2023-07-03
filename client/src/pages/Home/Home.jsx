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

const Home = () => {
  const token = localStorage.getItem('token')

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
      <GeneralInfo />
      <Categories />
      {isLoading && handleLoading()}
      {isError && handleError()}
      {data && data.tasks.length === 0 && noTasks()}

      <div className='task-list'>
        {data && data.tasks.map(task => <Task task={task} key={task._id} />)}
      </div>
    </div>
  )
}

export default Home
