import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

function Favourite() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const docRef = doc(db, 'user', localStorage.getItem('email'));

    const saved = onSnapshot(docRef, async (doc) => {
      if (doc.exists) {
        setPosts(doc.data().RID);
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    });

    // return cleanup function
    return () => saved();
  }, []);

  useEffect(() => {
    async function fetchData() {
    
        const promises = posts.map(async (post) => {
          const response = await fetch(`https://api.spoonacular.com/recipes/${post}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
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
    return <h1>Loading firebase data...</h1>;
  }

  return (
    <Grid>
      {results.map((item) => (
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
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;

    }
`;

  export default Favourite