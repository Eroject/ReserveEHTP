import { createContext, useContext, useState } from "react"
import AuthentificationApi from "../service-authentification/AuthentificationApi";



export  const StateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => {},
    logout: () => {},
    login: (email,password) => {},
    setAuthenticated: () => {},
    setToken: (token) => {},

});
export default function Context({children}) {
    const [user,setUser] = useState({});
    const [authenticated,_setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'));
    const login = async (email,password) => {
        return await AuthentificationApi.login(email,password)
    }
    const setToken = (token) => {
        window.localStorage.setItem('token',token)
    }
    const logout = () => {
        setUser({})
        setAuthenticated(false)
        setToken('')
    };
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED',isAuthenticated)
    }
    
    return <>
    <StateContext.Provider value={{
        user,
        login,
        authenticated,
        setAuthenticated,
        logout,
        setUser,
        setToken
     }}>
        {children}
    </StateContext.Provider>
    </>
}
export const useUserContext = () => useContext(StateContext)
