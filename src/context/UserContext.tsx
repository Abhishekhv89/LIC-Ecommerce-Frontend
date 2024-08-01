import { createContext, useEffect, useReducer, useState } from 'react';
import React, { ReactNode } from 'react';
// import { useCookies } from 'react-cookie';
// import jwtDecode,{JwtPayload} from 'jwt-decode';
// import jwt from 'jwt-js-decode';



interface Props {
    children: ReactNode;
}
interface Action {
    type: string;
    payload?: any;
}



export const UserContext = createContext({});

export const authReducer = (state:any, action:Action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { 
                ...state,
                isAuthenticated :true,
                user: action.payload };
        case'LOGIN_FAIL':
             return{
                ...state,
                isAuthenticated:false,
                user:null,
                error:action.payload
             }
        case 'LOGOUT':
            return { 
                ...state,
                user: null };
        default:
            return state;
    }
};

const initialState = () => {
    const store = localStorage.getItem("user");
    return store ? { user: JSON.parse(store) } : { user: null };
};



export const UserContextProvider : React.FC<Props> =({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {}, initialState);
    const [user, setUser] = useState(null);
  

    useEffect(() => {
        const store = localStorage.getItem("user");
       
        // console.log(store);
        

    //   setUser(decoded);

        const user = store ? JSON.parse(store) : null;
        if (user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        }
    }, []);
    // console.log("context ",state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
