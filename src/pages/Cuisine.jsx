import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();
    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        const recipes = await data.json();
        setCuisine(recipes.results);
    };

    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    }, [params.type])

    return (
        <Grid
        animate={{opacity: 1}}
        intial={{opacity: 0}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
        >
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to ={'/recipe/' + item.id}>
                        <img src={item.image} alt="" /> 
                        <h4>{item.title}</h4>
                        </Link>
                   
                    </Card>
                );
            })}
        </Grid>
    )
}


const Grid = styled(motion.div)`
    margin: 1rem 1rem;
    display: grid;
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
export default Cuisine