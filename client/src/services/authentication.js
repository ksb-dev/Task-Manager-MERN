/* eslint-disable no-unused-vars */
import axios from 'axios'

//const auth_url = '/url/api/v1/tasks/auth'
//const auth_url = 'http://localhost:5000/api/v1/tasks/auth'
const auth_url = '/api/v1/tasks/auth'
//const delete_account = '/url/api/v1/tasks/delete/account'
const delete_account = '/api/v1/tasks/delete/account'

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
  const response = await axios.get(delete_account, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
