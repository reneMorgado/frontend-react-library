import { useState } from "react"
import React from 'react'

export const userContext = React.createContext(null)

const UserContextProvider = ({children}) => {
    const [token, setToken] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [userId, setUserId] = useState('')
 
    return (
        <userContext.Provider value={{token, setToken, isAuth, setIsAuth, isAdmin, setIsAdmin, userId, setUserId}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider