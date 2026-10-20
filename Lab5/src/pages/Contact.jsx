import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ===== PHẦN 1: GIÁ TRỊ BAN ĐẦU =====
// Mỗi key = thuộc tính `name` của một ô nhập (phải trùng tên).
const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

// ===== PHẦN 2: LUẬT KIỂM TRA (YUP) =====
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Vui lòng nhập họ tên")
    .min(2, "Họ tên tối thiểu 2 ký tự"),
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^0\d{9}$/, "SĐT phải gồm 10 số, bắt đầu bằng 0"),
  message: Yup.string()
    .required("Vui lòng nhập nội dung")
    .min(10, "Nội dung tối thiểu 10 ký tự"),
});

export default function Contact() {
  // Tên người vừa gửi, dùng để hiện lời cảm ơn. null = chưa gửi.
  const [sentName, setSentName] = useState(null);

  // ===== PHẦN 3: KHỞI TẠO FORMIK =====
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Chỉ chạy khi Yup đã kiểm tra xong và KHÔNG còn lỗi.
      setSentName(values.fullName);
      formik.resetForm();
    },
  });

  // ===== PHẦN 4: GIAO DIỆN =====
  return (
    <div className="container my-4" style={{ maxWidth: 560 }}>
      <h2>Contact us</h2>

      {sentName && (
        <div className="alert alert-success">
          Cảm ơn {sentName}, chúng tôi đã nhận được tin nhắn của bạn!
          <button onClick={() => setSentName(null)}>Đóng</button>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-3">
          <label>Full name: </label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div style={{ color: "red" }}>{formik.errors.fullName}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Phone: </label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Message: </label>
          <textarea
            name="message"
            rows={4}
            className="form-control"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.message && formik.errors.message && (
            <div style={{ color: "red" }}>{formik.errors.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
