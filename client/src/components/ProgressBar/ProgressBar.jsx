/* eslint-disable no-unused-vars */
// circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

// tanstack Query
import { useQuery } from '@tanstack/react-query'

// services
import { getAllTasks, getCompletedTasks } from '../../services/tasks'

const ProgressBar = () => {
  const token = localStorage.getItem('token')

  const all = useQuery({
    queryKey: ['tasks'],
    queryFn: () => token && getAllTasks(token)
  })

  const completed = useQuery({
    queryKey: ['complete'],
    queryFn: () => token && getCompletedTasks(token)
  })

  return (
    <div className='progress-bar'>
      <CircularProgressbar
        value={
          all.data &&
          all.data.tasks.length !== 0 &&
          completed.data &&
          ((completed.data.tasks.length / all.data.tasks.length) * 100).toFixed(
            2
          )
        }
        strokeWidth={5}
        styles={buildStyles({
          pathColor: '#fff'
        })}
      />
      <div>
        {all.data && all.data.tasks.length !== 0 && completed.data ? (
          <span>
            {(
              (completed.data.tasks.length / all.data.tasks.length) *
              100
            ).toFixed(1)}
            %
          </span>
        ) : (
          <span>0%</span>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
