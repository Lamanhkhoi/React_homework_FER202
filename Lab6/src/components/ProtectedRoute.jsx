import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// Wrap admin-only pages: visitors are redirected to /login.
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }
  return children
}
