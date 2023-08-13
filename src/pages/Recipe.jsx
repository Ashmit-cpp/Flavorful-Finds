import React from 'react'
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("Instructions");
    const [RidAdded, setRidAdded] = useState();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        console.log(detailData)
        setDetails(detailData);
        setActiveTab("instructions")
        console.log(params.name);
    };

    //Update favbutton if recipe present in database
    const updateFav = async () => {
        const db = getFirestore();
        const docRef = doc(db, 'user', localStorage.getItem("email"));

        try {
            const doc = await getDoc(docRef);
            const currentRids = doc.data().RID || [];
            let updatedRids;

            if (currentRids.includes(params.name)) {
                updatedRids = arrayUnion(params.name);
                setRidAdded(true);
                console.log('RID added true!');
            } else {
                updatedRids = currentRids.filter((rid) => rid !== params.name);
                setRidAdded(false);
                console.log('RID removed false!');
            }

            await updateDoc(docRef, { RID: updatedRids });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    //Add or remove recipe from favs
    const handleAddRidClick = async () => {
        const db = getFirestore();
        const docRef = doc(db, 'user', localStorage.getItem("email"));

        try {
            const doc = await getDoc(docRef);
            const currentRids = doc.data().RID || [];
            let updatedRids;

            if (currentRids.includes(params.name)) {
                updatedRids = currentRids.filter((rid) => rid !== params.name);
                setRidAdded(false);
                console.log('RID removed from document!');
            } else {
                updatedRids = arrayUnion(params.name);
                setRidAdded(true);
                console.log('RID added to document!');
            }

            await updateDoc(docRef, { RID: updatedRids });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    useEffect(() => {
        fetchDetails();
        updateFav();
    }, [params.name]);

    return (
        <DetailWrapper>
          <div className="title-container">
            <div className="title-content">
              <h1>{details.title}</h1>
              <div className="image-container">
              <img src={details.image} alt="" />
            </div>
              <ButtonWrapper>
                <Button className={activeTab === "instructions" ? "active" : ''} onClick={() => setActiveTab("instructions")}>
                  Instructions
                </Button>
                <Button className={activeTab === "ingredients" ? "active" : ''} onClick={() => setActiveTab("ingredients")}>
                  Ingredients
                </Button>
                <Icon onClick={handleAddRidClick}>
                  {RidAdded ? (<AiFillHeart />) : (<AiOutlineHeart />)}
                </Icon>
              </ButtonWrapper>
            </div>
            
          </div>
         <InfoWrapper>
          {activeTab === 'instructions' && (
            <div>
              <h2 dangerouslySetInnerHTML={{ __html: details.summary }}></h2>
              <h2 dangerouslySetInnerHTML={{ __html: details.instructions }}></h2>
            </div>
          )}
      
          {activeTab === 'ingredients' && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
          </InfoWrapper>
        </DetailWrapper>
      );
}



const DetailWrapper = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  color: #e64f29;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    margin-left: 1rem;

  }

  .title-container {
    display: flex;
    align-items: center;
  }

  .title-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .image-container {
    margin-left: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h2 {
    margin-top: 2rem;
    color: #292421;
    font-size: 1.4rem;
    line-height: 1.8rem;
    font-weight: 100;
  }

  li {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #292421;
    font-weight: 400;
  }

  ul {
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: 2rem;
    color: #292421;
  }
`;

const Button = styled.button`
  border-radius: 7%;
  cursor: pointer;
  padding: 0.3rem 1rem;
  font-size: 1.4rem;
  color: #313131;
  background: rgba(255, 223, 183, 0.9);
  margin-top: 0.5rem;
  font-weight: 500;

  &.active {
    background: #ffab40;
    color: #292421;
  }

  .heart-icon {
    color: red;
    font-size: 1.2rem;
    font-weight: 900;
  }
`;

const Icon = styled.button`
  border-radius: 25%;
  cursor: pointer;
  padding: 0.3rem 0.8rem 0.1rem 0.8rem;
  font-size: 1.4rem;
  color: red;
  margin-top: 0.5rem;

  background: rgba(255, 223, 183, 0.9);
`;

const InfoWrapper = styled.div`
  margin: 1.5rem;
  margin-top: 0.5rem;

`;
const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
position: relative;
padding: 1rem;
button {
    margin-right: 1rem;
  }

`;

export default Recipe
