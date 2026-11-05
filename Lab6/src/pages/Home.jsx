import { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { getOrchids } from '../api/orchidApi'
import StatusMessage from '../components/StatusMessage'
import OrchidCard from '../components/OrchidCard'

// Public page: browse + search orchids.
export default function Home() {
  const [orchids, setOrchids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [keyword, setKeyword] = useState('')

  // Load the list from the API once when the page opens
  useEffect(() => {
    getOrchids()
      .then((data) => setOrchids(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Search on the client: filter by name
  const filteredOrchids = orchids.filter((orchid) =>
    orchid.name.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <>
      <div className="hero text-center text-white py-5">
        <h1>Orchid collection</h1>
        <p className="mb-0">Browse and search beautiful orchids</p>
      </div>

      <Container className="py-4">
        <Form.Control
          type="text"
          placeholder="Search orchid by name..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="mb-4"
        />

        <StatusMessage loading={loading} error={error}>
          {filteredOrchids.length === 0 ? (
            <p className="text-center text-muted">No orchid found.</p>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {filteredOrchids.map((orchid) => (
                <Col key={orchid.id}>
                  <OrchidCard orchid={orchid} />
                </Col>
              ))}
            </Row>
          )}
        </StatusMessage>
      </Container>
    </>
  )
}
