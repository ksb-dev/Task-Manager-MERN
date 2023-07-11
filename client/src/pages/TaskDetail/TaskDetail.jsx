/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

// react-query
import { useQuery, useMutation } from '@tanstack/react-query'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-router-dom
import { useParams, useNavigate } from 'react-router-dom'

// api
import { getSingleTask } from '../../services/tasks'

// react-icons
import { BiArrowBack } from 'react-icons/bi'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'
import Loading from '../../components/Loading/Loading'

// context
import { useTaskivityContext } from '../../context/context'

const TaskDetail = () => {
  const token = localStorage.getItem('token')

  const { id } = useParams()
  const { mode } = useTaskivityContext()

  const { isLoading, isError, data } = useQuery({
    queryKey: ['task'],
    queryFn: () => token && getSingleTask(id, token),

    onSuccess: data => {
      console.log(data)
    }
  })

  const handleLoading = () => {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='task-detail'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      {isLoading && handleLoading()}
    </div>
  )
}

export default TaskDetail
