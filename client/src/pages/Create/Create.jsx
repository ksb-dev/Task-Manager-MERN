/* eslint-disable no-unused-vars */
import { useState } from 'react'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-icons
import { BiArrowBack } from 'react-icons/bi'
import { HiOutlinePlusSmall } from 'react-icons/hi2'

// tanstack-query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// api
import { createTask } from '../../services/tasks'

//react-router-dom
import { useNavigate } from 'react-router-dom'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'

// context
import { useTaskivityContext } from '../../context/context'

const Create = () => {
  const token = localStorage.getItem('token')

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('low')
  const [description, setDescription] = useState('')
  const { mode } = useTaskivityContext()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success(`Task created successfully.`)

      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })

      navigate('/')
    },
    onError: data => {
      toast.error(data.response.data.message)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (title === '') {
      toast.error('You must enter title.')
    } else {
      createMutation.mutate({ title, description, priority, token })
    }
  }

  return (
    <div className='create-page'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      <form
        onSubmit={handleSubmit}
        className={mode ? 'lightBg2 darkColor' : 'darkBg1 lightColor'}
      >
        <div className='title-field'>
          <span>Title</span>
          <input
            type='text'
            className={mode ? 'lightBg1' : 'darkBg2'}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='description-field'>
          <span>Description</span>
          <textarea
            id='w3review'
            rows='7'
            cols='50'
            type='text'
            className={mode ? 'lightBg1' : 'darkBg2'}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className='priorities'>
          <span id='title'>Priority</span>
          <div className={'options ' + (mode ? 'lightBg1' : 'darkBg2')}>
            <div className='option' onClick={() => setPriority('low')}>
              {priority === 'low' ? (
                <span className='check lowActive'></span>
              ) : (
                <span
                  className={
                    'check ' + (mode ? 'darkCheckBorder' : 'lightCheckBorder')
                  }
                ></span>
              )}
              <span className='text'>Low</span>
            </div>

            <div className='option' onClick={() => setPriority('medium')}>
              {priority === 'medium' ? (
                <span className='check mediumActive'></span>
              ) : (
                <span
                  className={
                    'check ' + (mode ? 'darkCheckBorder' : 'lightCheckBorder')
                  }
                ></span>
              )}

              <span className='text'>Medium</span>
            </div>

            <div className='option' onClick={() => setPriority('high')}>
              {priority === 'high' ? (
                <span className='check highActive'></span>
              ) : (
                <span
                  className={
                    'check ' + (mode ? 'darkCheckBorder' : 'lightCheckBorder')
                  }
                ></span>
              )}
              <span className='text'>High</span>
            </div>
          </div>
        </div>

        <PrimaryBtn
          path={'#'}
          icon={<HiOutlinePlusSmall />}
          text={'Create Task'}
          value='btn'
          fn={handleSubmit}
          isLoading={createMutation.isLoading}
        />
      </form>
    </div>
  )
}

export default Create
