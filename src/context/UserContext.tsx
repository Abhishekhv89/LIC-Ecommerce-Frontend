
import { createContext,useState,useEffect,useReducer } from 'react'

export const UserContext = createContext({});
export const authReducer =(state:any,action:any)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

export const UserContextProvider  = ({children}:any)=> {
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    })
    
    useEffect(()=>{
        const store =localStorage.getItem("user")
        const user =store? JSON.parse(store):null;
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }

    },[])
    
    // console.log("userCOntect text :",state)
    
  return(
    <UserContext.Provider value={{...state,dispatch}}>
        {children}
    </UserContext.Provider>
  )
}