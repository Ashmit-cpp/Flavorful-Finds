import React from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("Instructions");
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        setActiveTab("instructions")  
      }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h1>{details.title}</h1>
                <img src={details.image} alt="" />
            </div>
            <Info>
                <Button className={activeTab === "instructions" ? "active" : ''} onClick={() => setActiveTab("instructions")}>
                    Instructions
                </Button>
                <Button className={activeTab === "ingridients" ? "active" : ''} onClick={() => setActiveTab("ingridients")}>
                    Ingridients
                </Button>
                {activeTab === 'instructions' && (
                    <div>
                        <h2 dangerouslySetInnerHTML={{ __html: details.summary }}>
                        </h2>
                        <h2 dangerouslySetInnerHTML={{ __html: details.instructions }}>
                        </h2>

                    </div>
                )} 

                {activeTab === 'ingridients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}

                    </ul>
                )}


            </Info>
        </DetailWrapper>
    )
}



const DetailWrapper = styled.div` 
    margin-top: 5rem; 
    margin-bottom: 5rem;
    display: flex;
    color: #7FC6A4;

    .active{
        background: linear-gradient(to right, #537562, #328054);
        color:  #CEEDDB;
    }
    h1{
        margin-bottom: 3rem;
    }
    h2 {
      margin-top: 2rem;
      color:  #CEEDDB; 
      font-size: 1.4rem;
      line-height: 1.8rem;
      font-weight: 100;


    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
        color:  #CEEDDB; 
        font-weight: 400;

    }
    ul {
        font-size: 1.2rem;
        line-height: 2.5rem;
        margin-top: 2rem;
        color:  #CEEDDB; 
    }
`;



const Button = styled.button`
cursor: pointer;
padding: 1rem 2rem;
font-size: 1.2rem;
color: #313131;
background: #6E8894;
border: 2px solid black;
margin-right: 2rem;
font-weight: 600;
`;

const Info = styled.div`
margin-left: 10rem;`;
export default Recipe