import axios from "axios";
import { useLayoutEffect, useReducer } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react"
import { instance } from "../components/Url";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return { ...state, user: null }
        case 'LOADED':
            return {...state, isLoading:false }
        // case 'isAdmin':
        //     console.log((action.payload));
        //     return {...state , admin:action.payload}
        default:
            return state
    }
}

export default function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoading:true
    })

    // useLayoutEffect(() => {

    //     const user = JSON.parse(localStorage.getItem('user'))
    //     if (user) {
    //         dispatch({ type: 'LOGIN', payload: user })
    //     }

    //     else{
    //         dispatch({type:'LOGOUT'})
    //     }
        
    //     dispatch({type:'LOADED'})

    // }, [])

    useLayoutEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        
        try {
            // Check if 'user' exists and is not undefined or null
            const user = JSON.parse(userFromStorage) ? JSON.parse(userFromStorage) : null;
            
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            dispatch({ type: 'LOGOUT' });
        }
    
        dispatch({ type: 'LOADED' });
    }, []);
    

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw Error('useAuthContext must be used inside a AuthContextProvider')
    }
  
    return context;
}