/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const getAllTasks = async () => {
  const response = await axios.get('/url/api/v1/tasks')
  return response.data
}

export const getCompletedTasks = async () => {
  const response = await axios.get('/url/api/v1/tasks/completed')
  return response.data
}

export const getIncompletedTasks = async () => {
  const response = await axios.get('/url/api/v1/tasks/incompleted')
  return response.data
}

export const getSingleTask = async id => {
  const response = await axios.get(`/url/api/v1/tasks/${id}`)
  return response.data
}

export const createTask = async ({ name, description, priority }) => {
  const response = await axios.post(`/url/api/v1/tasks`, {
    name,
    description,
    priority
  })
  return response.data
}

export const editTask = async ({ id, name }) => {
  // const response = await fetch(`/url/api/v1/tasks/${id}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ name })
  // })
  // const data = await response.json()

  // return data

  const response = await axios.patch(`/url/api/v1/tasks/${id}`, { name })
  return response.data
}

export const deleteTask = async id => {
  const response = await axios.delete(`/url/api/v1/tasks/${id}`)
  return response.data
}
