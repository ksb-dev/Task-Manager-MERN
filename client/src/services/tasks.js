/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from 'axios'

export const getAllTasks = async token => {
  const response = await axios.get('/url/api/v1/tasks', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getCompletedTasks = async token => {
  const response = await axios.get('/url/api/v1/tasks/completed', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getIncompletedTasks = async token => {
  const response = await axios.get('/url/api/v1/tasks/incompleted', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getSingleTask = async (id, token) => {
  const response = await axios.get(`/url/api/v1/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const createTask = async ({ title, description, priority, token }) => {
  const response = await axios.post(
    `/url/api/v1/tasks`,
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
  completed,
  token
}) => {
  const response = await axios.patch(
    `/url/api/v1/tasks/${id}`,
    {
      title,
      description,
      priority,
      completed
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
  const response = await axios.delete(`/url/api/v1/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
