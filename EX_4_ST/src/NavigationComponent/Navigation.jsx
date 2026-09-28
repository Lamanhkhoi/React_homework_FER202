import { useContext } from "react";
import { ThemeContext } from "../ContextEffectHook/ThemeContext.jsx";
import "./Navigation.css";
export default function Navigation() {
  const { theme, toggle, dark } = useContext(ThemeContext);
  return (
    <div>
      <nav
        className="theme-nav"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <ul>
          <li>
            <a className="active" href="#home">
              Home
            </a>
          </li>
          <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div style={{ position: "relative" }}>
          <a
            className="switch-mode"
            href="#"
            onClick={toggle}
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
              outline: "none",
            }}
            data-testid="toggle-theme-btn"
          >
            Switch Nav to {!dark ? "Dark" : "Light"} mode
          </a>
        </div>
      </nav>
    </div>
  );
}
