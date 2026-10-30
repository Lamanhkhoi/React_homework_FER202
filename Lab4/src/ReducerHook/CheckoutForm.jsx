import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  paymentMethod: "",
  agreeTerms: false,
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Vui lòng nhập họ tên")
    .min(2, "Họ tên tối thiểu 2 ký tự"),
  email: Yup.string()
    .required("Nhập đầy đủ email") 
    .matches(/^0+[^\s@]+@gmail\.com$/, "Email không hợp lệ"),
  phone: Yup.string()
    .required("Nhập số điện thoại")
    .matches(/\d{11}$/, "SĐT phải gồm 10 số, bắt đầu bằng 0"),
  address: Yup.string()
    .required("Nhập địa chỉ cụ thể"),
  paymentMethod: Yup.string()
    .required("Vui lòng chọn phương thức thanh toán"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "Phải đồng ý điều khoản")
});

export default function CheckoutForm({ isCartEmpty, onOrderSubmit }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
        onOrderSubmit(values);
        formik.resetForm();
    },
  });

  return (
    <form className="card" onSubmit={formik.handleSubmit} noValidate>
      <h3>Checkout</h3>

      <div className="field">
        <label htmlFor="fullName">Full name: </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className={formik.touched.fullName && formik.errors.fullName ? "invalid" : ""}
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="error" role="alert">{formik.errors.fullName}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          className={formik.touched.email && formik.errors.email ? "invalid" : ""}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error" role="alert">{formik.errors.email}</div>
        )}
      </div>
      <div className="field">
        <label htmlFor="phone">Phone: </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className={formik.touched.phone && formik.errors.phone ? "invalid" : ""}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error" role="alert">{formik.errors.phone}</div>
        )}
      </div>
      <div className="field">
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          name="address"
          className={formik.touched.address && formik.errors.address ? "invalid" : ""}
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && (
          <div className="error" role="alert">{formik.errors.address}</div>
        )}
      </div>

        <div className="field">
  <label>Payment method: </label>
  <div className="radio-group">
  <label>
    <input
      type="radio"
      name="paymentMethod"
      value="COD"
      checked={formik.values.paymentMethod === "COD"}
      onChange={formik.handleChange}
    />
    COD
  </label>
  <label>
    <input
      type="radio"
      name="paymentMethod"
      value="Card"
      checked={formik.values.paymentMethod === "Card"}
      onChange={formik.handleChange}
    />
    Card
  </label>
  </div>
  {formik.touched.paymentMethod && formik.errors.paymentMethod && (
    <div className="error" role="alert">{formik.errors.paymentMethod}</div>
  )}
</div>
        <div className="field">
        <label className="checkbox">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formik.values.agreeTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        Tôi đồng ý điều khoản
        </label>
        {formik.touched.agreeTerms && formik.errors.agreeTerms && (
          <div className="error" role="alert">{formik.errors.agreeTerms}</div>
        )}
      </div>
      <button type="submit" disabled={isCartEmpty}>
        Place order
      </button>
    </form>
  );
}
