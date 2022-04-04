import { BrowserRouter, Route, Routes } from "react-router-dom";

// page components
import NavBar from "./components/NavBar";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import ThemeSelector from "./components/ThemeSelector";

// styles
import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <NavBar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* n3 */}
          {/* Link home 的path要添加exact!!!否则当想要跳到单个recipe page的时候，还是会显示home page */}
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
