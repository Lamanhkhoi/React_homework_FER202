import { useFormik } from "formik";
import * as Yup from "yup";

// ===== PHẦN 1: GIÁ TRỊ BAN ĐẦU =====
// Mỗi key ở đây = thuộc tính `name` của một ô nhập (phải trùng tên).
const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  paymentMethod: "",
  agreeTerms: false,
};

// ===== PHẦN 2: LUẬT KIỂM TRA (YUP) =====
// Mỗi key = một ô, viết luật cho ô đó. Chuỗi trong ngoặc là câu báo lỗi.
const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên").min(2, "Họ tên tối thiểu 2 ký tự"),

  // TODO email: required + email
  email: Yup.string().required("Nhập đầy đủ email").email("Email không hợp lệ"),
  // TODO phone: required + matches(regex, "...")   (gợi ý regex: /^0\d{9}$/)
  phone: Yup.string().required("Nhập số điện thoại").matches(/^0\d{9}$/, "SĐT phải gồm 10 số, bắt đầu bằng 0"),
  // TODO address: required
  address: Yup.string().required("Nhập địa chỉ cụ thể"),
  // TODO paymentMethod: required   (giá trị COD hoặc Card)
  paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  // TODO agreeTerms: boolean + oneOf([true], "...")
  agreeTerms: Yup.boolean().oneOf([true], "Phải đồng ý điều khoản")
});

// Props:
//  - isCartEmpty: true nếu giỏ trống (để khóa nút Submit)
//  - onOrderSubmit: hàm cha truyền vào, gọi khi submit thành công (bước 4)
export default function CheckoutForm({ isCartEmpty, onOrderSubmit }) {
  // ===== PHẦN 3: KHỞI TẠO FORMIK =====
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Chỉ chạy khi Yup đã kiểm tra xong và KHÔNG còn lỗi.
      // TODO bước 4: gọi onOrderSubmit(values), rồi formik.resetForm()
        onOrderSubmit(values);   // báo cho cha: "khách đã đặt hàng, đây là thông tin"
        formik.resetForm();
    },
  });

  // ===== PHẦN 4: GIAO DIỆN =====
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <h3>Checkout</h3>

      {/* --- fullName: ví dụ hoàn chỉnh, các ô khác làm theo mẫu này --- */}
      <div>
        <label>Full name: </label>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div style={{ color: "red" }}>{formik.errors.fullName}</div>
        )}
      </div>

      {/* TODO email (type="email")   -> giống mẫu fullName */}
      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
      </div>
      {/* TODO phone (type="text")    -> giống mẫu fullName */}
      <div>
        <label>Phone: </label>
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div style={{ color: "red" }}>{formik.errors.phone}</div>
        )}
      </div>
      {/* TODO address                -> giống mẫu fullName */}
      <div>
        <label>Address: </label>
        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && (
          <div style={{ color: "red" }}>{formik.errors.address}</div>
        )}
      </div>

      {/* TODO paymentMethod: 2 radio cùng name="paymentMethod",
          value="COD" và value="Card", dùng checked={formik.values.paymentMethod === "COD"} */}
        <div>
  <label>Payment method: </label>
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
  {formik.touched.paymentMethod && formik.errors.paymentMethod && (
    <div style={{ color: "red" }}>{formik.errors.paymentMethod}</div>
  )}
</div>
      {/* TODO agreeTerms: <input type="checkbox" name="agreeTerms"
          checked={formik.values.agreeTerms} onChange={formik.handleChange} /> */}
        <div>
        <label>Tôi đồng ý điều khoản: </label>
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formik.values.agreeTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.agreeTerms && formik.errors.agreeTerms && (
          <div style={{ color: "red" }}>{formik.errors.agreeTerms}</div>
        )}
      </div>
      <button type="submit" disabled={isCartEmpty}>
        Place order
      </button>
    </form>
  );
}
