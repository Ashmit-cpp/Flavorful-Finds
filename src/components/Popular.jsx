// components/Popular.js
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <Wrapper>
      <span>Trending Now</span>

      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "1rem",
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <Gradient />
              <Title>{recipe.title}</Title>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

/* ---------- Styles ---------- */

const Wrapper = styled.div`
  margin: 2.5rem 0;
  padding: 0 2.5rem;
  span {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1c1917;
  }
`;

const Card = styled(Link)`
  display: block;
  position: relative;
  height: 14rem;
  border-radius: 1rem;
  overflow: hidden;
  background: #000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 1rem;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.p`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  z-index: 2;
  line-height: 1.2;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;

export default Popular;
