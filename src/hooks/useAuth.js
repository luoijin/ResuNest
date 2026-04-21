import { useState, useEffect } from 'react'

const STORAGE_KEY = 'resunest_users'
const SESSION_KEY = 'resunest_current_user'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem(SESSION_KEY)
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const signup = (name, email, password, role) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' }
    }
    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role, // 'freelancer' or 'client'
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    
    return { success: true, user: newUser }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword))
      setUser(userWithoutPassword)
      setIsLoggedIn(true)
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setIsLoggedIn(false)
  }

  return { user, isLoggedIn, isLoading, signup, login, logout }
}