import { useFetch } from "../../hooks/useFetch";

// styles
import "./Home.css";

// components
import RecipeList from "../../components/RecipeList";

export default function Home() {
  const { data, isPending, error } = useFetch(" http://localhost:3000/recipes");

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
      {/* n1 */}
      {/* 这里需要在 data.map 前写 data，确信有 data，because our data is null by default until we fetch it
(Home.js) */}
    </div>
  );
}
