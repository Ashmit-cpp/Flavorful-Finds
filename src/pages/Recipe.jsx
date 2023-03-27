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
    margin: 2rem 2rem; 
    display: flex;
    color: #e64f29;
    .active{
        background: linear-gradient(to right, #ff704d, #f53d0f);
        color:  #292421;
    }
    h1{
        margin-bottom: 3rem;
    }
    h2 {
      margin-top: 2rem;
      color:  #292421; 
      font-size: 1.4rem;
      line-height: 1.8rem;
      font-weight: 100;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
        color:  #292421; 
        font-weight: 400;
    }
    ul {
        font-size: 1.2rem;
        line-height: 2.5rem;
        margin-top: 2rem;
        color:  #292421; 
    }
`;



const Button = styled.button`
border-radius: 10%;
cursor: pointer;
padding: 1rem 2rem;
font-size: 1.2rem;
color: #313131;
background: #ffab40;
margin-right: 2rem;
font-weight: 600;
`;

const Info = styled.div`
margin-left: 10rem;`;
export default Recipe