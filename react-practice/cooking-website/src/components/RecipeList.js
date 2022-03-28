import { Link } from "react-router-dom";

// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          {/* n2 */}
          {/* 这里注意和Home.js里面的recipe Link对照看，注意链接的写法 */}
        </div>
      ))}
    </div>
  );
}
