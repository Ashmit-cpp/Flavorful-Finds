import React from 'react'
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("Instructions");
    const [RidAdded, setRidAdded] = useState(false);

    const [RidAdded, setRidAdded] = useState(false);

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        setActiveTab("instructions")
        console.log(params.name);
    }
        setActiveTab("instructions")
        console.log(params.name);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);


    const handleAddRidClick = async () => {
        const db = getFirestore();
        const docRef = doc(db, 'user', localStorage.getItem("email"));

        try {
            await updateDoc(docRef, { RID: arrayUnion(params.name) });
            setRidAdded(true);
            console.log('RID added to document!');
        } catch (error) {
            console.error('Error adding RID to document: ', error);
        }
    }

    const handleAddRidClick = async () => {
        const db = getFirestore();
        const docRef = doc(db, 'user', localStorage.getItem("email"));

        try {
            await updateDoc(docRef, { RID: arrayUnion(params.name) });
            setRidAdded(true);
            console.log('RID added to document!');
        } catch (error) {
            console.error('Error adding RID to document: ', error);
        }
    }
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

                <Button className={activeTab === "ingredients" ? "active" : ''} onClick={() => setActiveTab("ingredients")}>
                    Ingredients
                </Button>

                <Icon onClick={handleAddRidClick} disabled={RidAdded}>
                    {RidAdded ?
                        (<AiFillHeart />) :
                        (<AiOutlineHeart />)
                    }
                </Icon>


                <Icon onClick={handleAddRidClick} disabled={RidAdded}>
                    {RidAdded ?
                        (<AiFillHeart />) :
                        (<AiOutlineHeart />)
                    }
                </Icon>

                {activeTab === 'instructions' && (
                    <div>
                        <h2 dangerouslySetInnerHTML={{ __html: details.summary }}>
                        </h2>
                        <h2 dangerouslySetInnerHTML={{ __html: details.instructions }}>
                        </h2>

                    </div>
                )}
                )}

                {activeTab === 'ingredients' && (
                {activeTab === 'ingredients' && (
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
        background: #ffab40;
        background: #ffab40;
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
border-radius: 7%;
border-radius: 7%;
cursor: pointer;
padding: 0.3rem 1rem;
font-size: 1.6rem;
padding: 0.3rem 1rem;
font-size: 1.6rem;
color: #313131;
background: rgba(255,223,183,0.9);
background: rgba(255,223,183,0.9);
margin-right: 2rem;
font-weight: 500;
.heart-icon{
    color: red;
    font-size: 1.2rem;
    padding: 0.1rem 0.1rem;
    font-weight: 900;

    }
`;

const Icon = styled.button`
border-radius: 25%;
cursor: pointer;
padding: 0.3rem 0.1rem 0.1rem 0.1rem;
font-size: 1.5rem;
color: red;
background: rgba(255,223,183,0.9);

font-weight: 500;
.heart-icon{
    color: red;
    font-size: 1.2rem;
    padding: 0.1rem 0.1rem;
    font-weight: 900;

    }
`;

const Icon = styled.button`
border-radius: 25%;
cursor: pointer;
padding: 0.3rem 0.1rem 0.1rem 0.1rem;
font-size: 1.5rem;
color: red;
background: rgba(255,223,183,0.9);

`;

const Info = styled.div`
margin-left: 10rem;`;
export default Recipe