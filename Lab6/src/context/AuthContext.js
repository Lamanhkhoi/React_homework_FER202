import { createContext } from 'react'

// Shape: { user: {username, role} | null, login(account), logout() }
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

export default AuthContext
