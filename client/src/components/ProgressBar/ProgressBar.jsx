/* eslint-disable no-unused-vars */
// circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

// tanstack Query
import { useQuery } from '@tanstack/react-query'

// services
import { getAllTasks, getCompletedTasks } from '../../services/tasks'

// context
import { useTaskivityContext } from '../../context/context'

const ProgressBar = () => {
  const token = localStorage.getItem('token')
  const { mode } = useTaskivityContext()

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
      <div className='percentage'>
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
    //<div className={'progress-bar ' + (mode ? 'lightBg1' : 'darkBg2')}>
    //   <span
    //     className='progress-bar-inner'
    //     style={{
    //       width:
    //         (all.data &&
    //           all.data.tasks.length !== 0 &&
    //           completed.data &&
    //           (
    //             (completed.data.tasks.length / all.data.tasks.length) *
    //             100
    //           ).toFixed(2)) + '%'
    //     }}
    //   ></span>
    //   <div className='info'>
    //     <p>Progress</p>
    //     <div>
    //       {all.data && all.data.tasks.length !== 0 && completed.data ? (
    //         <span>
    //           {(
    //             (completed.data.tasks.length / all.data.tasks.length) *
    //             100
    //           ).toFixed(1)}
    //           %
    //         </span>
    //       ) : (
    //         <span>0%</span>
    //       )}
    //     </div>
    //   </div>
    // </div>
  )
}

export default ProgressBar
