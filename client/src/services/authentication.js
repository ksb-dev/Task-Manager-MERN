/* eslint-disable no-unused-vars */
import axios from 'axios'

export const signup = async ({ name, email, password }) => {
  const response = await axios.post('/url/api/v1/tasks/auth/register', {
    name,
    email,
    password
  })
  return response.data
}

export const login = async ({ email, password }) => {
  const response = await axios.post('/url/api/v1/tasks/auth/login', {
    email,
    password
  })
  return response.data
}
