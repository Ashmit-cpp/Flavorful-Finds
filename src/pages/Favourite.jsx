import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

function Favourite() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "user", localStorage.getItem("email"));

    //Request Firebase for Rid field of user document
    const saved = onSnapshot(docRef, async (doc) => {
      if (doc.exists) {
        setPosts(doc.data().RID);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    });

    // return cleanup function
    return () => saved();
  }, []);

  useEffect(() => {
    async function fetchData() {
      //make JSON by fetching recipe using RID from API
      const promises = posts.map(async (post) => {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${post}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.json();
        localStorage.setItem(`fav-${post}`, JSON.stringify(data));
        return data;
      });
      const results = await Promise.all(promises);
      setResults(results);
    }

    if (posts.length > 0) {
      fetchData();
    }
  }, [posts]);

  if (loading) {
    return <h1>Loading your favourite recipes!!</h1>;
  }

  return (
    <Grid>
      {results
        .slice()
        .reverse()
        .map((item) => (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        ))}
    </Grid>
  );
}

const Grid = styled.div`
  margin: 1rem 1rem;

  display: grid;
  color: #292421;

  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;
const Card = styled.div`
  background-color: #ffe0bb;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  a {
    text-decoration: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 100%;
    max-width: 100%; /* Ensure the image does not exceed the card width */
    height: auto; /* Maintain the image's aspect ratio */
    border-radius: 2rem;
    object-fit: cover; /* Maintain aspect ratio while covering the card */
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }

  &:hover {
    background-color: #ffedb2;
    transform: scale(1.02);
    box-shadow: 0 0.3rem 0.7rem rgba(0, 0, 0, 0.2);
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
export default Favourite;
