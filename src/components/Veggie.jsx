import { useEffect, useState } from "react";
import RecipeCarousel from "./RecipeCarousel";

export default function Veggie() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const cached = localStorage.getItem("veggie");
    if (cached) { try { setRecipes(JSON.parse(cached)); } catch (_) {} return; }
    if (!process.env.REACT_APP_API_KEY) return;
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
      .then((res) => res.json()).then((data) => { if (data.recipes) { setRecipes(data.recipes); localStorage.setItem("veggie", JSON.stringify(data.recipes)); } }).catch(() => {});
  }, []);
  return <RecipeCarousel eyebrow="The green table" title="Vegetables, with intent" intro="Plant-led compositions with depth, contrast, and enough theatre to make the centre of the table feel earned." recipes={recipes} vegetarian />;
}
