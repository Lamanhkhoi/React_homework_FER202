import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BsNavbar bg="white" className="border-bottom shadow-sm">
      <Container>
        <BsNavbar.Brand as={Link} to="/">Orchids</BsNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {user && <Nav.Link as={Link} to="/admin">Manage</Nav.Link>}
        </Nav>
        {user ? (
          <div className="d-flex align-items-center gap-2">
            <span>Hi, {user.username}</span>
            <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button as={Link} to="/login" size="sm">Admin login</Button>
        )}
      </Container>
    </BsNavbar>
  )
}
