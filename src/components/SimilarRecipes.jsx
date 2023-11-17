import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function SimilarRecipes() {
  const [SimilarRecipes, setSimilarRecipes] = useState([]);
  let params = useParams();

  const getSimilarRecipes = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=4`
    );
    const recipes = await data.json();
    console.log(recipes);
    setSimilarRecipes(recipes);
  };

  useEffect(() => {
    getSimilarRecipes();
  }, [params.search]);

  return (
    <Wrapper>
      <h2>You might also like:</h2>
      <Grid>
        {SimilarRecipes.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #ffecd6;
  @media (max-width: 768px) {
    margin: 0.1rem 0.2rem 16rem;
    max-width: 20rem;

  }
`;

const Grid = styled.div`
  margin: 0.1rem 0.2rem;
  display: grid;
  max-width: 18rem;
  color: #292421;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 0.8rem;
`;

const Card = styled.div`
  max-width: 18rem;
  background-color: #ffe0bb;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.4rem;
  position: relative;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: right;
  }

  h4 {
    color: black;
    padding: 0.4rem;
  }

  &:hover {
    background-color: #ffedb2;
    transform: scale(1.02);
    box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 171, 64, 0.3);
  }

  @media (max-width: 768px) {
    /* Adjust card styling for mobile devices */
    padding: 0.5rem;
    box-shadow: none;
  }
`;
export default SimilarRecipes;
