import React, { createContext, useState, useContext } from 'react'

const ServerListContext = createContext()
export const useServerList = () => useContext(ServerListContext)

export function ServerListProvider({ children }) {
  const [serverList, setServerList] = useState([])
  return (
    <ServerListContext.Provider value={[serverList, setServerList]}>
      {children}
    </ServerListContext.Provider>
  )
}
