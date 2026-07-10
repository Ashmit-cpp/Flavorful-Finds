import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid";

export default function Cuisine() {
  const [recipes, setRecipes] = useState([]);
  const { type } = useParams();
  useEffect(() => {
    if (!process.env.REACT_APP_API_KEY) return;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}`)
      .then((res) => res.json()).then((data) => setRecipes(data.results || [])).catch(() => {});
  }, [type]);
  return <RecipeGrid eyebrow="Cuisine, considered" title={type} description={`A Sol-curated journey through ${type} cooking—guided by character, craft, and the ingredients that make it unmistakably itself.`} recipes={recipes} />;
}
