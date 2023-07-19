/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// react-query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-router-dom
import { useParams, useNavigate } from 'react-router-dom'

// react-icons
import { BiArrowBack } from 'react-icons/bi'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'

// ----------------------------------------------------------------

// context
import { useTaskivityContext } from '../../context/context'

// services
import { getSingleTask, deleteTask } from '../../services/tasks'

// utils
import { getPriorityBg } from '../../utils/getPriorityBg'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'
import Loading from '../../components/Loading/Loading'
import PriorityTag from '../../components/ProgressTag/ProgressTag'
import Date from '../../components/Date/Date'

const TaskDetail = () => {
  const token = localStorage.getItem('token')

  const { id } = useParams()
  const { mode } = useTaskivityContext()

  const navigate = useNavigate()

  const { isLoading, isError, data } = useQuery({
    queryKey: ['task'],
    queryFn: () => token && getSingleTask(id, token)
  })

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(id, token),

    onSuccess: () =>
      Promise.all(
        [
          toast.success(`Task deleted successfully`),

          queryClient.invalidateQueries(['tasks']),
          queryClient.invalidateQueries(['complete']),
          queryClient.invalidateQueries(['incomplete'])
        ],
        navigate('/')
      ),

    onError: () => {
      toast.error(`Failed to delete task`)
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const handleLoading = () => {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  const handleError = () => {
    return <div className='loading'>Failed to fetch task!</div>
  }

  const getDescription = description => {
    const result = description.split('\n')
    return result
  }

  return (
    <div className='task-detail'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      {isLoading && handleLoading()}
      {!isLoading && isError && handleError()}
      {!isLoading && !isError && data && (
        <div
          className={
            'task-detail-inner ' +
            (mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor')
          }
        >
          <PriorityTag complete={data.task.complete} />

          <div className='date-priority'>
            <Date date={data.task.date} />
            <span
              className={'priority ' + `${getPriorityBg(data.task.priority)}`}
            >
              {data.task.priority.charAt(0).toUpperCase() +
                data.task.priority.substring(1)}{' '}
              Priority
            </span>
          </div>

          <div className='title-description'>
            <div className='title'>
              <span
              //className={`${getPriorityBg(data.task.priority)}`}
              >
                Title
              </span>
              <p className={mode ? 'lightBg1' : 'darkBg2'}>{data.task.title}</p>
            </div>

            <div className='description'>
              <span
                //className={'desc ' + `${getPriorityBg(data.task.priority)}`}
                className='desc'
              >
                Description
              </span>
              {data.task.description && (
                <p className={mode ? 'lightBg1' : 'darkBg2'}>
                  {getDescription(data.task.description).map((el, i) => (
                    <span key={i}>{el}</span>
                  ))}
                </p>
              )}
            </div>
          </div>

          <PrimaryBtn
            path={`/edit/${data && data.task._id}`}
            icon={<LiaEdit />}
            text={'Edit Task'}
            value='link'
          />
          <div className='delete-btn' onClick={handleDelete}>
            <span className='delete-icon'>
              <RiDeleteBin6Line />
            </span>
            Delete
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetail
