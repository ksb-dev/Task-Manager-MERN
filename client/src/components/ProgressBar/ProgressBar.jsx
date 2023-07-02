// circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

// tanstack Query
import { useQuery } from '@tanstack/react-query'

// services
import {getAllTasks, getCompletedTasks} from '../../services/tasks'

const ProgressBar = () => {
  const all = useQuery({
    queryKey: ['all'],
    queryFn: getAllTasks
  })

  const completed = useQuery({
    queryKey: ['completed'],
    queryFn: getCompletedTasks
  })

  return (
    <div className='progress-bar'>
      <CircularProgressbar
        value={all.data  && completed.data && ((completed.data.tasks.length / all.data.tasks.length) * 100).toFixed(2)}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: '#fff'
        })}
      />
      <span>{all.data  && completed.data && ((completed.data.tasks.length / all.data.tasks.length) * 100).toFixed(1)}%</span>
    </div>
  )
}

export default ProgressBar
