/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

const taskivity_url = '/url/api/v1/tasks'
//const taskivity_url = '/api/v1/tasks'

export const useSearchAll = () => {
  const getSearchResults = async (
    query,
    token,
    setSearchResults,
    setLoading,
    setError
  ) => {
    try {
      setLoading(true)

      const response = await axios.get(
        taskivity_url + `/search/title?name=${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setLoading(false)
        setSearchResults(response.data.tasks)
      } else {
        setError('Failed to search')
      }
    } catch (e) {
      setLoading(false)
      setError('')
      console.log(e)
    }
  }

  const getIncompletedSearchResults = async (
    query,
    token,
    setSearchResults,
    setLoading,
    setError
  ) => {
    try {
      setLoading(true)

      const response = await axios.get(
        taskivity_url + `/search/incomplete/title?name=${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setLoading(false)
        setSearchResults(response.data.filteredTasks)
      } else {
        setLoading(false)
        setError('Failed to search')
      }
    } catch (e) {
      setLoading(false)
      setError('')
      console.log(e)
    }
  }

  const getCompletedSearchResults = async (
    query,
    token,
    setSearchResults,
    setLoadong,
    setError
  ) => {
    try {
      setLoadong(true)

      const response = await axios.get(
        taskivity_url + `/search/complete/title?name=${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setLoadong(false)
        setSearchResults(response.data.filteredTasks)
      } else {
        setLoadong(false)
        setError('Failed to search')
      }
    } catch (e) {
      setLoadong(false)
      setError('')
      console.log(e)
    }
  }

  return {
    getSearchResults,
    getIncompletedSearchResults,
    getCompletedSearchResults
  }
}
