import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public: visitors browse + search */}
        <Route path="/" element={<Home />} />
        <Route path="/orchids/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />

        {/* Admin only: create / update / delete */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
