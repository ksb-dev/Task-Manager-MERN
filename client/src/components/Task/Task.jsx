/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react'

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
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsChevronDown, BsCheckCircleFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'

// components
import Description from '../Description/Description'

/* eslint-disable react/prop-types */
const Task = ({ task }) => {
  const token = localStorage.getItem('token')

  const [show, setShow] = useState(false)
  const { _id, title, description, priority, completed, date } = task
  const { mode } = useTaskivityContext()
  const descRef = useRef(null)
  const downBtnRef = useRef(null)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(_id, token),
    // onSuccess: () => {
    //   toast.success(`Task deleted`)

    //   queryClient.invalidateQueries({
    //     queryKey: ['tasks']
    //   }),
    //     queryClient.invalidateQueries({
    //       queryKey: ['complete']
    //     }),
    //     queryClient.invalidateQueries({
    //       queryKey: ['incomplete']
    //     })
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

  const getDescription = description => {
    const res = description.split('\n')
    return res
  }

  const showDescription = () => {
    setShow(!show)

    if (show) {
      descRef.current.style.display = 'block'
      downBtnRef.current.style.transform = 'rotate(180deg)'
    } else {
      descRef.current.style.display = 'none'
      downBtnRef.current.style.transform = 'rotate(0deg)'
    }
  }

  return (
    <div
      className={'task ' + (mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor')}
    >
      <div className='container-1'>
        {completed ? (
          <p className='complete'>
            <span className='check'>
              <BsCheckCircleFill />
            </span>
            <span>Complete</span>
          </p>
        ) : (
          <p className='complete'>
            <span className='cancel'>
              <MdCancel />
            </span>{' '}
            <span>Incomplete</span>
          </p>
        )}

        <div className='edit-delete'>
          <Link to={`/edit/${_id}`} className='editBtn'>
            <span>
              <LiaEdit />
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
          {description && (
            <p
              ref={downBtnRef}
              className={'down-icon ' + getClass(priority)}
              onClick={showDescription}
            >
              <span>
                <BsChevronDown />
              </span>
            </p>
          )}
        </div>
        <Description
          show={show}
          setShow={setShow}
          descRef={descRef}
          getClass={getClass}
          description={description}
          getDescription={getDescription}
          priority={priority}
          downBtnRef={downBtnRef}
        />
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
