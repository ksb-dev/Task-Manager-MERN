/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useRef } from 'react'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// services
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
import { LiaArrowRightSolid } from 'react-icons/lia'

// utils
import { getPriorityColor } from '../../utils/getPriorityColor'

// components
import Date from '../Date/Date'
import ProgressTag from '../ProgressTag/ProgressTag'

const Task = ({ task }) => {
  const token = localStorage.getItem('token')

  const { _id, title, priority, complete, date, description } = task
  const { mode } = useTaskivityContext()
  const downBtnRef = useRef(null)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(_id, token),

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

  return (
    <div
      className={'task ' + (mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor')}
    >
      <ProgressTag complete={complete} />

      <div className='date-edit-delete'>
        <Date date={date} />
        <div className='edit-delete'>
          <Link
            to={`/edit/${_id}`}
            className={'editBtn ' + (mode ? 'lightBg1' : 'darkBg2')}
          >
            <span>
              <FiEdit />
            </span>
          </Link>

          <p
            onClick={handleDelete}
            className={'deleteBtn ' + (mode ? 'lightBg1' : 'darkBg2')}
          >
            <span className='deleteIcon'>
              <RiDeleteBin6Line />
            </span>
          </p>
        </div>
      </div>

      <div className='container-2'>
        <div className={'name ' + getPriorityColor(priority)}>
          {title}

          {description && (
            <Link
              to={`/detail/${_id}`}
              ref={downBtnRef}
              className={'down-icon ' + getPriorityColor(priority)}
            >
              <span>
                <LiaArrowRightSolid />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Task
