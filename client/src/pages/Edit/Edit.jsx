/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

// react-query
import { useQuery, useMutation } from '@tanstack/react-query'

// react-hot-toast
import { toast } from 'react-hot-toast'

// react-router-dom
import { useParams, useNavigate } from 'react-router-dom'

// api
import { getSingleTask, editTask } from '../../services/tasks'

// react-icons
import { BiArrowBack } from 'react-icons/bi'
import { LiaEdit } from 'react-icons/lia'

// components
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn'
import Loading from '../../components/Loading/Loading'

// context
import { useTaskivityContext } from '../../context/context'

const Edit = () => {
  const token = localStorage.getItem('token')

  const { id } = useParams()
  const navigate = useNavigate()
  const { mode } = useTaskivityContext()

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  const [description, setDescription] = useState('')
  const [isCompleted, setIsCompleted] = useState('')

  useEffect(() => {
    const res = token && getSingleTask(id, token)

    if (res) {
      res.then(data => {
        setTitle(data && data.task.title)
        setPriority(data && data.task.priority)
        setDescription(data && data.task.description)
        setIsCompleted(data && data.task.completed)
      })
    }
  }, [id, token])

  const editMutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      toast.success(`Task edited successfully`)
      navigate('/')
    },
    onError: () => {
      toast.error('Failed to edit task')
    }
  })

  const handleEdit = e => {
    e.preventDefault()
    if (title === '') {
      toast.error('You must enter title.')
    } else {
      editMutation.mutate({
        id,
        title,
        description,
        priority,
        completed: isCompleted,
        token
      })
    }
  }

  return (
    <div className='edit-page'>
      <PrimaryBtn path={'/'} icon={<BiArrowBack />} text={'Back To Home'} />
      {!title && (
        <p>
          <Loading />
        </p>
      )}
      {title && (
        <form
          onSubmit={handleEdit}
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

          <div className='priorities'>
            <span id='title'>Progress</span>
            <div className={'options ' + (mode ? 'lightBg1' : 'darkBg2')}>
              <div className='option' onClick={() => setIsCompleted(true)}>
                {isCompleted === true ? (
                  <span className='check lowActive'></span>
                ) : (
                  <span
                    className={
                      'check ' + (mode ? 'darkCheckBorder' : 'lightCheckBorder')
                    }
                  ></span>
                )}
                <span className='text'>Complete</span>
              </div>

              <div className='option' onClick={() => setIsCompleted(false)}>
                {isCompleted === false ? (
                  <span className='check highActive'></span>
                ) : (
                  <span
                    className={
                      'check ' + (mode ? 'darkCheckBorder' : 'lightCheckBorder')
                    }
                  ></span>
                )}

                <span className='text'>Incomplete</span>
              </div>
            </div>
          </div>

          <PrimaryBtn
            path={'#'}
            icon={<LiaEdit />}
            text={'Edit Task'}
            value='btn'
            fn={handleEdit}
            isLoading={editMutation.isLoading}
          />
        </form>
      )}
    </div>
  )
}

export default Edit
