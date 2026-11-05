import { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Alert, Badge } from 'react-bootstrap'
import { getOrchids, createOrchid, updateOrchid, deleteOrchid } from '../api/orchidApi'
import StatusMessage from '../components/StatusMessage'
import OrchidForm from '../components/OrchidForm'

// Admin only (guarded by <ProtectedRoute> in App.jsx): create / update / delete orchids.
export default function AdminDashboard() {
  const [orchids, setOrchids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(0) // change this number => the list is fetched again

  const [showForm, setShowForm] = useState(false)
  const [editingOrchid, setEditingOrchid] = useState(null) // null = Add, object = Edit
  const [formError, setFormError] = useState(null)
  const [deletingOrchid, setDeletingOrchid] = useState(null)
  const [message, setMessage] = useState(null) // { type: 'success' | 'danger', text }

  // Load the list at first and every time `reload` changes (after add / edit / delete)
  useEffect(() => {
    getOrchids()
      .then((data) => {
        setOrchids(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [reload])

  const refreshList = () => setReload((n) => n + 1)

  // ----- Add / Edit -----
  const openAdd = () => {
    setEditingOrchid(null)
    setFormError(null)
    setShowForm(true)
  }

  const openEdit = (orchid) => {
    setEditingOrchid(orchid)
    setFormError(null)
    setShowForm(true)
  }

  const handleSubmit = (values) => {
    const request = editingOrchid
      ? updateOrchid(editingOrchid.id, values)
      : createOrchid(values)

    // return the promise so Formik knows when the submit is finished
    return request
      .then(() => {
        setShowForm(false)
        setMessage({
          type: 'success',
          text: editingOrchid ? 'Orchid updated successfully!' : 'Orchid added successfully!',
        })
        refreshList()
      })
      .catch((err) => setFormError(err.message))
  }

  // ----- Delete -----
  const handleDelete = () => {
    deleteOrchid(deletingOrchid.id)
      .then(() => {
        setMessage({ type: 'success', text: `Deleted "${deletingOrchid.name}".` })
        refreshList()
      })
      .catch((err) => setMessage({ type: 'danger', text: `Delete failed: ${err.message}` }))
      .finally(() => setDeletingOrchid(null))
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Manage orchids</h2>
        <Button onClick={openAdd}>+ Add orchid</Button>
      </div>

      {message && (
        <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <StatusMessage loading={loading} error={error}>
        <Table striped hover responsive className="bg-white align-middle shadow-sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Origin</th>
              <th>Rating</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orchids.map((orchid) => (
              <tr key={orchid.id}>
                <td>
                  <img src={orchid.image} alt={orchid.name} className="table-img" />
                </td>
                <td>{orchid.name}</td>
                <td>{orchid.category}</td>
                <td>{orchid.origin}</td>
                <td>{orchid.rating}</td>
                <td>
                  {orchid.isSpecial && <Badge bg="warning" text="dark" className="me-1">Special</Badge>}
                  {orchid.isNatural && <Badge bg="success">Natural</Badge>}
                </td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2" onClick={() => openEdit(orchid)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => setDeletingOrchid(orchid)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {orchids.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted">No orchids yet.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </StatusMessage>

      {/* Add / Edit modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingOrchid ? 'Edit orchid' : 'Add orchid'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          {editingOrchid ? (
            <OrchidForm
              initialValues={editingOrchid}
              onSubmit={handleSubmit}
              submitLabel="Update"
            />
          ) : (
            <OrchidForm onSubmit={handleSubmit} submitLabel="Add" />
          )}
        </Modal.Body>
      </Modal>

      {/* Delete confirm modal */}
      <Modal show={deletingOrchid !== null} onHide={() => setDeletingOrchid(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{deletingOrchid?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeletingOrchid(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
