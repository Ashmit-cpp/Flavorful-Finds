import React from 'react'
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {

  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    }
    else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      getVeggie(data.recipes);
      console.log(data.recipes);

    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Vegeterian Picks 🌟 </h3>
        <Splide options={{
          perPage: 4,
          arrowPath: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            768: {
              perPage: 1, 
            },
          },
        }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p> 
                    <img src={recipe.image} alt={recipe.title} />
                  </Link>
                  <Gradient/>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div` 
 margin: 4rem 1rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 18rem;
  min-width: 4rem;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0.3rem 0.7rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 171, 64, 0.3);
  }

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: #ffefe0;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div` 
{  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));}
`;

export default Veggie