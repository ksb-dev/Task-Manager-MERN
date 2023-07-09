/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

const taskivity_url = '/url/api/v1/tasks'
//const taskivity_url = '/api/v1/tasks'

export const useSearchAll = () => {
  const getSearchResults = async (query, token, setSearchResults) => {
    try {
      const response = await axios.get(
        taskivity_url + `/search/title?name=${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setSearchResults(response.data.tasks)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getIncompletedSearchResults = async (
    query,
    token,
    setSearchResults
  ) => {
    try {
      const response = await axios.get(
        taskivity_url + `/search/incomplete/title?name=${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setSearchResults(response.data.filteredTasks)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getCompletedSearchResults = async (query, token, setSearchResults) => {
    try {
      const response = await axios.get(
        taskivity_url + `/search/complete/title?name=${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setSearchResults(response.data.filteredTasks)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getSearchResults,
    getIncompletedSearchResults,
    getCompletedSearchResults
  }
}
