// import { useFetch } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";

// styles
import "./Home.css";

// components
import RecipeList from "../../components/RecipeList";
import { useEffect, useState } from "react";

export default function Home() {
  // ==============json data=======================================
  // const { data, isPending, error } = useFetch(" http://localhost:3000/recipes");

  // n8 fetching firestore collection========================================
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // projectFirestore
    //   .collection("recipes")
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot.empty) {
    //       setError("No recipes to load");
    //       setIsPending(false);
    //     } else {
    //       let results = [];
    //       snapshot.docs.forEach((doc) => {
    //         results.push({ id: doc.id, ...doc.data() });
    //       });
    //       setData(results);
    //       setIsPending(false);
    //     }
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setIsPending(false);
    //   });
    // empty dependency-> just run once

    // ===============n10 Real time data=====================
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  // =========================================================
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
