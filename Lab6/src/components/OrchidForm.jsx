import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { emptyOrchid } from '../constants/orchid'


const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required.')
    .min(2, 'Must be 2 characters or more'),
  rating: Yup.number()
    .typeError('Please type a number.')
    .required('Required.')
    .integer('Rating must be a whole number: 1, 2, 3, 4 or 5')
    .min(1, 'Rating must be from 1 to 5')
    .max(5, 'Rating must be from 1 to 5'),
  image: Yup.string()
    .required('Required.')
    .url('Must be a valid URL (http://...)'),
  color: Yup.string()
    .required('Required.'),
  origin: Yup.string()
    .required('Required.'),
  category: Yup.string()
    .required('Required.'),
})

export default function OrchidForm({ initialValues = emptyOrchid, onSubmit, submitLabel = 'Save' }) {
  // PHẦN 2: khởi tạo Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,                 
    enableReinitialize: true, 
  })

  // PHẦN 3: giao diện — mỗi ô: name + value + onChange + onBlur + div lỗi
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={formik.touched.name && formik.errors.name ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger small">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          step="1"
          className={formik.touched.rating && formik.errors.rating ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.rating && formik.errors.rating && (
          <div className="text-danger small">{formik.errors.rating}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          className={formik.touched.image && formik.errors.image ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-danger small">{formik.errors.image}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="color" className="form-label">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          className={formik.touched.color && formik.errors.color ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.color && formik.errors.color && (
          <div className="text-danger small">{formik.errors.color}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="origin" className="form-label">Origin</label>
        <input
          type="text"
          id="origin"
          name="origin"
          className={formik.touched.origin && formik.errors.origin ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.origin}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.origin && formik.errors.origin && (
          <div className="text-danger small">{formik.errors.origin}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          className={formik.touched.category && formik.errors.category ? 'form-control is-invalid' : 'form-control'}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.category && formik.errors.category && (
          <div className="text-danger small">{formik.errors.category}</div>
        )}
      </div>

      
      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            id="isSpecial"
            name="isSpecial"
            className="form-check-input"
            checked={formik.values.isSpecial}
            onChange={formik.handleChange}
          />
          <label htmlFor="isSpecial" className="form-check-label">Special</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            id="isNatural"
            name="isNatural"
            className="form-check-input"
            checked={formik.values.isNatural}
            onChange={formik.handleChange}
          />
          <label htmlFor="isNatural" className="form-check-label">Natural</label>
        </div>
      </div>

      <Button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </form>
  )
}
