import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h2>404 - Page not found</h2>
      <Link to="/">Back to Home</Link>
    </Container>
  )
}
