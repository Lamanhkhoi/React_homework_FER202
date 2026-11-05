import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginAdmin } from '../api/authApi'
import useAuth from '../hooks/useAuth'

// PHẦN 1: giá trị ban đầu — mỗi key = name của một ô
const initialValues = {
  username: '',
  password: '',
}

// PHẦN 2: luật Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Required.'),
  password: Yup.string().required('Required.'),
})

// Admin login page.
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  // PHẦN 3: khởi tạo Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setError(null)
      loginAdmin(values.username, values.password)
        .then((account) => {
          login(account)
          navigate('/admin')
        })
        .catch((err) => setError(err.message))
        .finally(() => setSubmitting(false))
    },
  })

  // PHẦN 4: giao diện
  return (
    <Container className="py-5" style={{ maxWidth: 420 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-3">Admin login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control'}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger small">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger small">{formik.errors.password}</div>
              )}
            </div>
            <Button type="submit" disabled={formik.isSubmitting} className="w-100">
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  )
}
