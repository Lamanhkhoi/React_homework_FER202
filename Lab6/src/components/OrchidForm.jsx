import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { emptyOrchid } from '../constants/orchid'

// One form for BOTH Add and Edit (Formik manages values, Yup validates).
// Props: initialValues (empty for Add, the orchid for Edit), onSubmit(values), submitLabel.

const validationSchema = Yup.object({
  name: Yup.string().required('Required.').min(2, 'Must be 2 characters or more'),
  rating: Yup.number()
    .typeError('Please type a number.')
    .required('Required.')
    .min(1, 'Rating must be from 1 to 5')
    .max(5, 'Rating must be from 1 to 5'),
  image: Yup.string().required('Required.').url('Must be a valid URL (http://...)'),
  color: Yup.string().required('Required.'),
  origin: Yup.string().required('Required.'),
  category: Yup.string().required('Required.'),
})

export default function OrchidForm({ initialValues = emptyOrchid, onSubmit, submitLabel = 'Save' }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <Field id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating (1-5)</label>
            <Field id="rating" name="rating" type="number" className="form-control" />
            <ErrorMessage name="rating" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image URL</label>
            <Field id="image" name="image" className="form-control" />
            <ErrorMessage name="image" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label htmlFor="color" className="form-label">Color</label>
            <Field id="color" name="color" className="form-control" />
            <ErrorMessage name="color" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label htmlFor="origin" className="form-label">Origin</label>
            <Field id="origin" name="origin" className="form-control" />
            <ErrorMessage name="origin" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <Field id="category" name="category" className="form-control" />
            <ErrorMessage name="category" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <div className="form-check form-check-inline">
              <Field id="isSpecial" name="isSpecial" type="checkbox" className="form-check-input" />
              <label htmlFor="isSpecial" className="form-check-label">Special</label>
            </div>
            <div className="form-check form-check-inline">
              <Field id="isNatural" name="isNatural" type="checkbox" className="form-check-input" />
              <label htmlFor="isNatural" className="form-check-label">Natural</label>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
