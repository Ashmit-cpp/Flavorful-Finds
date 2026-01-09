import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { MdRestaurant } from "react-icons/md";

function Recipe() {
  const params = useParams();
  const id = params.name;
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFav, setIsFav] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!id) return;
    setActiveTab("instructions");
    fetchDetails();
    checkFavStatus();
    getSimilarRecipes();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setDetails(json);
    } catch (e) {
      console.error("fetchDetails:", e);
    }
  };

  const getSimilarRecipes = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=6`
      );
      const recipes = await data.json();
      setSimilarRecipes(recipes);
    } catch (e) {
      console.error("getSimilarRecipes:", e);
    }
  };

  const checkFavStatus = async () => {
    if (!userEmail) return setIsFav(false);
    try {
      const db = getFirestore();
      const docRef = doc(db, "user", userEmail);
      const snap = await getDoc(docRef);
      const current = snap.exists() ? snap.data().RID || [] : [];
      setIsFav(current.includes(id));
    } catch (e) {
      console.error("checkFavStatus:", e);
    }
  };

  const toggleFavorite = async () => {
    if (!userEmail) return;
    const db = getFirestore();
    const docRef = doc(db, "user", userEmail);

    try {
      if (isFav) {
        await updateDoc(docRef, { RID: arrayRemove(id) });
        setIsFav(false);
      } else {
        await updateDoc(docRef, { RID: arrayUnion(id) });
        setIsFav(true);
      }
    } catch (e) {
      console.error("toggleFavorite:", e);
    }
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroImageWrapper>
          <HeroImage src={details.image} alt={details.title} />
          <ImageOverlay />
        </HeroImageWrapper>
        
        <HeroContent>
          <RecipeHeader>
            <div>
              <RecipeTitle>{details.title}</RecipeTitle>
              {details.sourceName && <SourceTag>{details.sourceName}</SourceTag>}
            </div>
            
            {userEmail && (
              <FavButton onClick={toggleFavorite} $active={isFav}>
                {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
              </FavButton>
            )}
          </RecipeHeader>

          <MetaInfo>
            {details.readyInMinutes && (
              <MetaItem>
                <BiTime />
                <span>{details.readyInMinutes} mins</span>
              </MetaItem>
            )}
            {details.servings && (
              <MetaItem>
                <MdRestaurant />
                <span>{details.servings} servings</span>
              </MetaItem>
            )}
          </MetaInfo>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <ContentSection>
          {details.summary && (
            <SummaryCard>
              <div dangerouslySetInnerHTML={{ __html: details.summary }} />
            </SummaryCard>
          )}

          <TabNav>
            <TabButton
              $active={activeTab === "ingredients"}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </TabButton>
            <TabButton
              $active={activeTab === "instructions"}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </TabButton>
          </TabNav>

          <ContentCard>
            {activeTab === "ingredients" && (
              <IngredientsGrid>
                {details.extendedIngredients?.map((ingredient) => (
                  <IngredientItem key={ingredient.id}>
                    <IngredientCheck />
                    <span>{ingredient.original}</span>
                  </IngredientItem>
                )) || <EmptyState>No ingredients available</EmptyState>}
              </IngredientsGrid>
            )}

            {activeTab === "instructions" && (
              <InstructionsContent
                dangerouslySetInnerHTML={{ __html: details.instructions || "<p>No instructions available</p>" }}
              />
            )}
          </ContentCard>
        </ContentSection>

        {similarRecipes.length > 0 && (
          <SimilarSection>
            <SectionTitle>You might also like</SectionTitle>
            <SimilarGrid>
              {similarRecipes.map((recipe) => (
                <SimilarCard key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <SimilarTitle>{recipe.title}</SimilarTitle>
                  <ViewLink>View Recipe →</ViewLink>
                </SimilarCard>
              ))}
            </SimilarGrid>
          </SimilarSection>
        )}
      </MainContent>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #fef3f2 0%, #ffffff 40%);
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 16px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 2;
  padding: 2rem;
  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
  }
`;

const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RecipeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SourceTag = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
`;

const FavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: ${p => p.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  svg {
    font-size: 1.75rem;
    color: ${p => p.$active ? '#e94a63' : '#888'};
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);
    background: white;
    
    svg {
      color: #e94a63;
    }
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  
  svg {
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    
    svg {
      font-size: 1.25rem;
    }
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
`;

const SummaryCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
  
  a {
    color: #e94a63;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 0.95rem;
  }
`;

const TabNav = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${p => p.$active ? '#e94a63' : 'transparent'};
  color: ${p => p.$active ? '#e94a63' : '#666'};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: -2px;
  
  &:hover {
    color: #e94a63;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const ContentCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fef3f2;
    transform: translateX(5px);
  }
`;

const IngredientCheck = styled.div`
  min-width: 20px;
  min-height: 20px;
  border: 2px solid #e94a63;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  ${IngredientItem}:hover & {
    background: #e94a63;
  }
`;

const InstructionsContent = styled.div`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333;
  
  ol, ul {
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 1rem;
      padding-left: 0.5rem;
    }
  }
  
  h3, h4 {
    color: #222;
    margin: 1.5rem 0 1rem;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: #999;
  font-size: 1rem;
  padding: 2rem;
`;

const SimilarSection = styled.section`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const SimilarCard = styled(Link)`
  display: block;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(233, 74, 99, 0.15);
    border-color: #e94a63;
  }
`;

const SimilarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const ViewLink = styled.span`
  color: #e94a63;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default Recipe;