import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, Alert } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { loginAdmin } from '../api/authApi'
import useAuth from '../hooks/useAuth'

const validationSchema = Yup.object({
  username: Yup.string().required('Required.'),
  password: Yup.string().required('Required.'),
})

// Admin login page.
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleSubmit = (values, { setSubmitting }) => {
    setError(null)
    loginAdmin(values.username, values.password)
      .then((account) => {
        login(account)
        navigate('/admin')
      })
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false))
  }

  return (
    <Container className="py-5" style={{ maxWidth: 420 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Admin login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field id="username" name="username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger small" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field id="password" name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger small" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-100">
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  )
}
