import { createContext, useEffect, useReducer } from 'react';
import React, { ReactNode } from 'react';
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
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
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

    useEffect(() => {
        const store = localStorage.getItem("user");
        const user = store ? JSON.parse(store) : null;
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);
    // console.log("context ",state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
