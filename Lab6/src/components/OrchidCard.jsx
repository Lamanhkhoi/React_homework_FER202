import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// One orchid card for the public list. Data comes from props (from the API), never hardcoded.
export default function OrchidCard({ orchid }) {
  return (
    <Card className="orchid-card h-100 shadow-sm">
      <Card.Img variant="top" src={orchid.image} alt={orchid.name} />
      <Card.Body>
        <Card.Title>{orchid.name}</Card.Title>
        <Card.Text className="text-muted mb-2">
          {orchid.category} - {orchid.origin}
        </Card.Text>
        <Card.Text className="mb-2">
          Rating: <strong>{orchid.rating}</strong>/5 ★ | Color: {orchid.color}
        </Card.Text>
        {orchid.isSpecial && (
          <Badge bg="warning" text="dark" className="me-1">Special</Badge>
        )}
        {orchid.isNatural && <Badge bg="success">Natural</Badge>}
      </Card.Body>
      <Card.Footer className="bg-white border-0">
        <Button as={Link} to={`/orchids/${orchid.id}`} size="sm" variant="outline-primary">
          Detail
        </Button>
      </Card.Footer>
    </Card>
  )
}
