/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext, useContext } from 'react'

const TaskivityContext = createContext()

const TaskivityProvider = ({ children }) => {
  const [mode, setMode] = useState(true)

  return (
    <TaskivityContext.Provider
      value={{
        mode,
        setMode
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
