import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./NavBar.css";
import Searchbar from "./Searchbar";
export default function NavBar() {
  const { color } = useTheme();

  // const { color } = useContext(ThemeContext);
  // n4
  // right after useContext() is ThemeContext, not ThemeProvider

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Jing</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
