import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const useAuthContext = ()=> {
    const context = useContext(UserContext);
    if(!context){
        throw Error('useAuthContext must be used inside an userContextProvider')
    }
  return context
}


