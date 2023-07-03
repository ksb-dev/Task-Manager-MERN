/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext, useContext, useEffect } from 'react'

const TaskivityContext = createContext()

const TaskivityProvider = ({ children }) => {
  const [mode, setMode] = useState(true)
  const [rerenderNavBar, setRerenderNavBar] = useState(false)

  return (
    <TaskivityContext.Provider
      value={{
        mode,
        setMode,

        rerenderNavBar,
        setRerenderNavBar
      }}
    >
      {children}
    </TaskivityContext.Provider>
  )
}

export const useTaskivityContext = () => {
  return useContext(TaskivityContext)
}

export { TaskivityContext, TaskivityProvider }
