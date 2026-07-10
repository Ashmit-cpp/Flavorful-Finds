import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid";

export default function Searched() {
  const [recipes, setRecipes] = useState([]);
  const { search } = useParams();
  useEffect(() => {
    if (!process.env.REACT_APP_API_KEY) return;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${search}`)
      .then((res) => res.json()).then((data) => setRecipes(data.results || [])).catch(() => {});
  }, [search]);
  return <RecipeGrid eyebrow="Sol found" title={search} description="A short, considered edit. Each recipe balances the thing you asked for with season, technique, and the pleasure of the table." recipes={recipes} />;
}
