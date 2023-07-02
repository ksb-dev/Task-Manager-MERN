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
import { BsChevronDown, BsCheckCircle } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'

// components
import Description from '../Description/Description'

/* eslint-disable react/prop-types */
const Task = ({ task }) => {
  const [show, setShow] = useState(false)
  const { _id, name, description, priority, completed, date } = task
  const { mode } = useTaskivityContext()
  const descRef = useRef(null)
  const downBtnRef = useRef(null)

  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: data => {
      toast.success(`Task deleted`)

      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      toast.error(`Failed to delete task`)
    }
  })

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
        <span className='date'>{moment(date).format('Do MMM, YYYY')}</span>
        <div className='edit-delete'>
          <Link to={`/edit/${_id}`} className='editBtn'>
            <span>
              <LiaEdit />
            </span>
          </Link>

          <p onClick={() => mutate(_id)} className='deleteBtn'>
            <span className='deleteIcon'>
              <RiDeleteBin6Line />
            </span>
          </p>
        </div>
      </div>

      <div className='container-2'>
        <div className={'name ' + getClass(priority)}>
          {name}
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

      {completed ? (
        <p className='complete'>
          <span className='check'>
            <BsCheckCircle />
          </span>
          <span>Completed</span>
        </p>
      ) : (
        <p className='complete'>
          <span className='cancel'>
            <MdOutlineCancel />
          </span>{' '}
          <span>Incompleted</span>
        </p>
      )}
    </div>
  )
}

export default Task
