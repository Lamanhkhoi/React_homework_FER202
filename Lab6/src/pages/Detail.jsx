import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Card, Row, Col, Badge } from 'react-bootstrap'
import { getOrchidById } from '../api/orchidApi'
import StatusMessage from '../components/StatusMessage'

// Public page: one orchid at /orchids/:id
export default function Detail() {
  const { id } = useParams()
  const [orchid, setOrchid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getOrchidById(id)
      .then((data) => setOrchid(data))
      .catch((err) => {
        // an unknown id returns 404 from mockapi
        if (err.response && err.response.status === 404) {
          setError(`Orchid with id = ${id} was not found.`)
        } else {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <Container className="py-4">
      <Link to="/">&larr; Back to Home</Link>
      <div className="mt-3">
        <StatusMessage loading={loading} error={error}>
          {orchid && (
            <Card className="shadow-sm">
              <Row className="g-0">
                <Col md={5}>
                  <img src={orchid.image} alt={orchid.name} className="detail-img" />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title as="h2">{orchid.name}</Card.Title>
                    <p>Category: {orchid.category}</p>
                    <p>Origin: {orchid.origin}</p>
                    <p>Color: {orchid.color}</p>
                    <p>Rating: {orchid.rating}/5 ★</p>
                    {orchid.isSpecial && <Badge bg="warning" text="dark" className="me-1">Special</Badge>}
                    {orchid.isNatural ? <Badge bg="success">Natural</Badge> : <Badge bg="secondary">Hybrid</Badge>}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          )}
        </StatusMessage>
      </div>
    </Container>
  )
}
