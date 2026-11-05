import { Alert, Spinner } from 'react-bootstrap'

// "Handle API loading states, errors" -> one place to show them.
// Usage: <StatusMessage loading={loading} error={error}>...content...</StatusMessage>
export default function StatusMessage({ loading, error, children }) {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    )
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }
  return children
}
