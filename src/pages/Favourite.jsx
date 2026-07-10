import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import RecipeGrid from "../components/RecipeGrid";

export default function Favourite() {
  const [ids, setIds] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return undefined;
    return onSnapshot(doc(db, "user", email), (snapshot) => setIds(snapshot.data()?.RID || []));
  }, []);
  useEffect(() => {
    if (!ids.length || !process.env.REACT_APP_API_KEY) return;
    Promise.all(ids.map((id) => fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`).then((r) => r.json())))
      .then(setResults).catch(() => {});
  }, [ids]);
  return <RecipeGrid eyebrow="Your private edit" title="Saved for later" description="The dishes you wanted to remember, kept together for the evening that calls for them." recipes={results} />;
}
