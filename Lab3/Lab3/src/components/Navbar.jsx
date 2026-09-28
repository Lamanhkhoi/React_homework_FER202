import { useContext } from "react";
import { Navbar as BsNavbar, Container, Button } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { dark, toggle } = useContext(ThemeContext);
  const { user, login, logout } = useContext(AuthContext);

  return (
    <BsNavbar className="border-bottom px-3">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <BsNavbar.Brand>Orchids</BsNavbar.Brand>

        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-secondary" size="sm" onClick={toggle}>
            {dark ? "Light mode" : "Dark mode"}
          </Button>

          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <span>Log in as (ex: Aaron)</span>
              <Button variant="primary" size="sm" onClick={login}>
                Login
              </Button>
            </>
          )}
        </div>
      </Container>
    </BsNavbar>
  );
}
