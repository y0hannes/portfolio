import { createContext, useState, useEffect, useContext } from 'react'
import loginServices from '../services/loginServices'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const savedUserString = window.localStorage.getItem('Admin');

    if (savedUserString) {
      try {
        const savedUser = JSON.parse(savedUserString);
        if (savedUser?.token) {
          setAdmin(savedUser);
          loginServices.setToken(savedUser.token);
        }
      } catch (error) {
        console.error('Failed to parse saved user from localStorage:', error);
        localStorage.removeItem('Admin');
      }
    }
  }, []);


  const login = async (username, password) => {
    try {
      const userData = await loginServices.login({ username, password })
      setAdmin(userData)
      loginServices.setToken(userData.token)
      localStorage.setItem('Admin', JSON.stringify(userData))
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    setAdmin(null)
    loginServices.setToken(null)
    localStorage.removeItem('Admin')
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
