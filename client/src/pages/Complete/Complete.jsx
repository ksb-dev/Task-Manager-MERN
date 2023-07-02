/* eslint-disable no-unused-vars */
// tanstack Query
import { useQuery } from '@tanstack/react-query'

// services
import { getCompletedTasks } from '../../services/tasks'

// components
import GeneralInfo from '../../components/GeneralInfo/GeneralInfo'
import Categories from '../../components/Categories/Categories'
import Loading from '../../components/Loading/Loading'
import Task from '../../components/Task/Task'

const Complete = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['complete'],
    queryFn: getCompletedTasks
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

  return (
    <div className='complete'>
      <GeneralInfo />
      <Categories />
      {isLoading && handleLoading()}
      {error && handleError()}

      <div className='task-list'>
        {data && data.tasks.map(task => <Task task={task} key={task._id} />)}
      </div>
    </div>
  )
}

export default Complete
