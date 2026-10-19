import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center my-5">
      <h3>404 - Không có trang này</h3>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}
