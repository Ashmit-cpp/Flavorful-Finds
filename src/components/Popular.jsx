import { useEffect, useState } from "react";
import RecipeCarousel from "./RecipeCarousel";

export default function Popular() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const cached = localStorage.getItem("popular");
    if (cached) { try { setRecipes(JSON.parse(cached)); } catch (_) {} return; }
    if (!process.env.REACT_APP_API_KEY) return;
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
      .then((res) => res.json()).then((data) => { if (data.recipes) { setRecipes(data.recipes); localStorage.setItem("popular", JSON.stringify(data.recipes)); } }).catch(() => {});
  }, []);
  return <RecipeCarousel eyebrow="The daily edit" title="Worth making tonight" intro="Four dishes chosen for season, pleasure, and the particular magic of a meal that feels more considered than complicated." recipes={recipes} />;
}
