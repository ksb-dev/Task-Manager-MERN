/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from 'axios'

//const taskivity_url = '/url/api/v1/tasks'
//const taskivity_url = 'http://localhost:5000/api/v1/tasks'
const taskivity_url = '/api/v1/tasks'

export const getAllTasks = async token => {
  const response = await axios.get(taskivity_url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getCompletedTasks = async token => {
  const response = await axios.get(taskivity_url + '/completed', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getIncompletedTasks = async token => {
  const response = await axios.get(taskivity_url + '/incompleted', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getSingleTask = async (id, token) => {
  const response = await axios.get(taskivity_url + `/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const createTask = async ({ title, description, priority, token }) => {
  const response = await axios.post(
    taskivity_url,
    {
      title,
      description,
      priority
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const editTask = async ({
  id,
  title,
  description,
  priority,
  complete,
  token
}) => {
  const response = await axios.patch(
    taskivity_url + `/${id}`,
    {
      title,
      description,
      priority,
      complete
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const deleteTask = async (id, token) => {
  const response = await axios.delete(taskivity_url + `/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
