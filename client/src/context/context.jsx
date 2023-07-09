/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext, useContext, useRef } from 'react'

const TaskivityContext = createContext()

const TaskivityProvider = ({ children }) => {
  const [mode, setMode] = useState(true)
  const [rerenderNavBar, setRerenderNavBar] = useState(false)

  const searchRef = useRef(null)
  const searchModalRef = useRef(null)
  const searchModalInnerRef = useRef(null)

  return (
    <TaskivityContext.Provider
      value={{
        mode,
        setMode,

        rerenderNavBar,
        setRerenderNavBar,

        searchRef,
        searchModalRef,
        searchModalInnerRef
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
