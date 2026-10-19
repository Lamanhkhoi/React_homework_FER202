import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert } from "react-bootstrap";

// PHẦN 1: giá trị ban đầu (key trùng với name của ô nhập)
const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

// PHẦN 2: luật kiểm tra bằng Yup
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
    .min(2, "Nội dung tối thiểu 10 ký tự"),
});

export default function Contact() {
  const [sentName, setSentName] = useState(null);

  // PHẦN 3: khởi tạo Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setSentName(values.fullName);
      resetForm();
    },
  });

  // Gọn lại cho mỗi ô: trả về props dùng chung + trạng thái lỗi
  const field = (name) => ({
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    isInvalid: formik.touched[name] && !!formik.errors[name],
  });

  const error = (name) => (
    <Form.Control.Feedback type="invalid">
      {formik.errors[name]}
    </Form.Control.Feedback>
  );

  return (
    <div className="container my-4" style={{ maxWidth: 560 }}>
      <h2 className="mb-3">Contact us</h2>

      {sentName && (
        <Alert variant="success" dismissible onClose={() => setSentName(null)}>
          Cảm ơn {sentName}, chúng tôi đã nhận được tin nhắn của bạn!
        </Alert>
      )}

      {/* noValidate: tắt kiểm tra của trình duyệt, chỉ để Yup kiểm tra */}
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control type="text" {...field("fullName")} />
          {error("fullName")}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...field("email")} />
          {error("email")}
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" {...field("phone")} />
          {error("phone")}
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={4} {...field("message")} />
          {error("message")}
        </Form.Group>

        <Button type="submit" variant="primary">
          Send
        </Button>
      </Form>
    </div>
  );
}
