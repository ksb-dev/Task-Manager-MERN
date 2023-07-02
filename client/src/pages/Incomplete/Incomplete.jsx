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
  const { isLoading, error, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getIncompletedTasks
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
    <div className='incomplete'>
      <GeneralInfo />
      <Categories />
      {isLoading && handleLoading()}
      {error && handleError()}

      {/* <ul>
        {data &&
          data.tasks.map(task => (
            <li key={task._id}>
              <Task task={task} />
            </li>
          ))}
      </ul> */}
    </div>
  )
}

export default Incomplete
