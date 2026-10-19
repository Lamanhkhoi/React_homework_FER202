import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="nav">
      <Link to="/">Players</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
