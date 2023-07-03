/* eslint-disable no-unused-vars */
// tanstack Query
import { useQuery } from '@tanstack/react-query'

// services
import { getIncompletedTasks } from '../../services/tasks'

// components
import Loading from '../../components/Loading/Loading'
import Task from '../../components/Task/Task'
import GeneralInfo from '../../components/GeneralInfo/GeneralInfo'
import Categories from '../../components/Categories/Categories'

const Incomplete = () => {
  const token = localStorage.getItem('token')

  const { isLoading, error, data } = useQuery({
    queryKey: ['incomplete'],
    queryFn: () => token && getIncompletedTasks(token)
  })

  const handleLoading = () => {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  const handleError = () => {
    return <div className='loading'>Error</div>
  }

  const noTasks = () => {
    return <div className='loading'>No Incompleted Tasks Found!</div>
  }

  return (
    <div className='incomplete'>
      <GeneralInfo />
      <Categories />
      {isLoading && handleLoading()}
      {error && handleError()}
      {data && data.tasks.length === 0 && noTasks()}

      <div className='task-list'>
        {data && data.tasks.map(task => <Task task={task} key={task._id} />)}
      </div>
    </div>
  )
}

export default Incomplete
