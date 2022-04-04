import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";

// Styles

import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  // ================json data=======================
  // const url = "http://localhost:3000/recipes/" + id;
  // const { error, isPending, data: recipe } = useFetch(url);
  const { mode } = useTheme();

  // n9 ============firestore document===================
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // projectFirestore
    //   .collection("recipes")
    //   .doc(id)
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setIsPending(false);
    //       setRecipe(doc.data());
    //     } else {
    //       setIsPending(false);
    //       setError("Could not find that recipe");
    //     }
    //   });

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });
    // 这里创建unsub很重要
    // we're not longer listening for document changes if we navigate away

    return () => unsub();
  }, [id]);
  // =================================================

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "something completely different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}
