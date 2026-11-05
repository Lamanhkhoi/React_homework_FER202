import { useState } from 'react'
import AuthContext from './AuthContext'

const STORAGE_KEY = 'orchid_admin'

// Keeps the logged-in admin in state + localStorage so a page reload does not log out.
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  })

  const login = (account) => {
    // TODO: store only what the UI needs (username, role) - never keep the password
    const safeUser = { username: account.username, role: account.role }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
