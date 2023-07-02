/* eslint-disable no-unused-vars */
// react-query
import { useMutation } from '@tanstack/react-query'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-router-dom
import { useParams, useNavigate } from 'react-router-dom'

// api
import { editTask } from '../../services/tasks'

// react-icons
import { BiArrowBack } from 'react-icons/bi'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      toast.success(`Task updated`)
      navigate('/')
    },
    onError: () => {
      toast.error('Failed to update task')
    }
  })

  const handleUpdate = () => {
    mutation.mutate({
      id,
      name: 'Learn Angular'
    })
  }

  return (
    <div className='edit-page'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
    </div>
  )
}

export default Edit
