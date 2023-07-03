/* eslint-disable no-unused-vars */
import axios from 'axios'

// const auth_url = '/url/api/v1/tasks/auth'
const auth_url = '/api/v1/tasks/auth'

export const signup = async ({ name, email, password }) => {
  const response = await axios.post(auth_url + '/register', {
    name,
    email,
    password
  })
  return response.data
}

export const login = async ({ email, password }) => {
  const response = await axios.post(auth_url + '/login', {
    email,
    password
  })
  return response.data
}
