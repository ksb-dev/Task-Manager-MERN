/* eslint-disable no-unused-vars */
import axios from 'axios'

//const auth_url = '/url/api/v1/tasks/auth'
const auth_url = '/api/v1/tasks/auth'

export const signup = async ({ name, email, password, image }) => {
  const response = await axios.post(auth_url + '/register', {
    name,
    email,
    password,
    image
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

export const deleteAccount = async token => {
  const response = await axios.get('/url/api/v1/tasks/delete/account', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
