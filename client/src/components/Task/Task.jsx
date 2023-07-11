/* eslint-disable no-unused-vars */
import { useRef } from 'react'

// moment
import moment from 'moment'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// api
import { deleteTask } from '../../services/tasks'

// react-router-dom
import { Link } from 'react-router-dom'

// context
import { useTaskivityContext } from '../../context/context'

// react-icons
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { LiaArrowRightSolid } from 'react-icons/lia'
import { AiFillTags } from 'react-icons/ai'
import { TbProgressX, TbProgressCheck } from 'react-icons/tb'

/* eslint-disable react/prop-types */
const Task = ({ task }) => {
  const token = localStorage.getItem('token')

  const { _id, title, priority, complete, date } = task
  const { mode } = useTaskivityContext()
  const downBtnRef = useRef(null)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(_id, token),
    // onSuccess: () => {
    //   toast.success(`Task deleted`)

    //   queryClient.invalidateQueries({
    //     queryKey: ['tasks']
    //   }),

    // },
    onSuccess: () =>
      Promise.all([
        toast.success(`Task deleted successfully`),

        queryClient.invalidateQueries(['tasks']),
        queryClient.invalidateQueries(['complete']),
        queryClient.invalidateQueries(['incomplete'])
      ]),
    onError: () => {
      toast.error(`Failed to delete task`)
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const getClass = priority => {
    if (priority === 'low') {
      return 'lowPriority'
    } else if (priority === 'medium') {
      return 'mediumPriority'
    } else {
      return 'highPriority'
    }
  }

  return (
    <div
      className={'task ' + (mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor')}
    >
      {complete ? (
        <p className={'complete'}>
          <span className='check'>
            <BsCheckCircleFill />
            {/* <TbProgressCheck /> */}
          </span>
          <span>Complete</span>
        </p>
      ) : (
        <p className={'incomplete'}>
          <span className='cancel'>
            <MdCancel />
            {/* <TbProgressX /> */}
          </span>
          <span>Incomplete</span>
        </p>
      )}

      <div className='container-1'>
        <div className='edit-delete'>
          <Link to={`/edit/${_id}`} className='editBtn'>
            <span>
              <FiEdit />
            </span>
          </Link>

          <p onClick={handleDelete} className='deleteBtn'>
            <span className='deleteIcon'>
              <RiDeleteBin6Line />
            </span>
          </p>
        </div>
      </div>

      <div className='container-2'>
        <div className={'name ' + getClass(priority)}>
          {title}

          <Link
            to={`/detail/${_id}`}
            ref={downBtnRef}
            className={'down-icon ' + getClass(priority)}
          >
            <span>
              <LiaArrowRightSolid />
            </span>
          </Link>
        </div>
      </div>

      <div className='date'>
        <span>
          <SlCalender />
        </span>
        <span>{moment(date).format('Do MMMM, YYYY')}</span>
      </div>
    </div>
  )
}

export default Task
