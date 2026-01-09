import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function SimilarRecipes() {
  const [similarRecipes, setSimilarRecipes] = useState([]);
  let params = useParams();

  const getSimilarRecipes = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=4`
    );
    const recipes = await data.json();
    setSimilarRecipes(recipes);
  };

  useEffect(() => {
    getSimilarRecipes();
  }, [params.name]); // Changed from params.search to params.name to match dependency

  return (
    <Container>
      <h3>You might also like:</h3>
      <Grid>
        {similarRecipes.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                {/* Note: Similar endpoint sometimes doesn't return images, handling title only nicely */}
                <div className="card-content">
                    <h4>{item.title}</h4>
                    <span className="view-btn">View Recipe</span>
                </div>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2rem;
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);

  a {
    text-decoration: none;
    display: block;
    padding: 1.5rem;
  }

  h4 {
    color: #313131;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    line-height: 1.4rem;
  }

  .view-btn {
    font-size: 0.7rem;
    color: #e94057;
    font-weight: 600;
    text-transform: uppercase;
  }

  &:hover {
    border-color: #e94057;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(233, 64, 87, 0.1);
  }

  @media (max-width: 1024px) {
     &:hover {
        transform: translateY(-5px);
     }
  }
`;

export default SimilarRecipes;