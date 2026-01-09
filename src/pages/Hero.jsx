import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";

// --- Styled Components Definition ---

// Animations
const blobAnimation = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const Section = styled.section`
  position: relative;
  width: 100%;
  // bg-gradient-to-br from-amber-50 to-orange-100
  background: linear-gradient(135deg, #fffbeb 0%, #ffedd5 100%);
  padding: 5rem 1.5rem; /* py-20 px-6 */
  overflow: hidden;

  @media (min-width: 1024px) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
`;

const Blob = styled.div`
  position: absolute;
  width: 24rem; /* w-96 */
  height: 24rem; /* h-96 */
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(64px); /* blur-3xl */
  opacity: 0.3;
  animation: ${blobAnimation} 7s infinite;
  z-index: 0;

  ${(props) =>
    props.$variant === "yellow" &&
    css`
      background-color: #fde047; /* yellow-300 */
      top: 0;
      right: 0;
      margin-top: -5rem;
      margin-right: -5rem;
    `}

  ${(props) =>
    props.$variant === "orange" &&
    css`
      background-color: #fdba74; /* orange-300 */
      bottom: 0;
      left: 0;
      margin-bottom: -5rem;
      margin-left: -5rem;
      animation-delay: 2s;
    `}
`;

const ContentWrapper = styled.div`
  position: relative;
  max-width: 56rem; /* max-w-4xl */
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* space-y-8 (approx) */
  z-index: 10;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  align-self: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  border: 1px solid #fde68a; /* amber-200 */
  color: #92400e; /* amber-800 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 3rem; /* text-5xl */
  font-weight: 800; /* font-extrabold */
  color: #1c1917; /* stone-900 */
  letter-spacing: -0.025em;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 4.5rem; /* md:text-7xl */
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    to right,
    #d97706,
    #ea580c
  ); /* from-amber-600 to-orange-600 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.125rem; /* text-lg */
  color: #57534e; /* stone-600 */
  max-width: 42rem; /* max-w-2xl */
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 1.25rem; /* md:text-xl */
  }
`;

const FormContainer = styled.form`
  position: relative;
  max-width: 42rem; /* max-w-2xl */
  width: 100%;
  margin: 0 auto;
`;

const GlowLayer = styled.div`
  position: absolute;
  inset: -0.25rem; /* -inset-1 */
  background: linear-gradient(
    to right,
    #fb923c,
    #fbbf24
  ); /* from-orange-400 to-amber-400 */
  border-radius: 9999px;
  filter: blur(8px);
  opacity: 0.25;
  transition: opacity 200ms;

  ${FormContainer}:hover & {
    opacity: 0.5;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-xl */
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem; /* py-4 pl-12 */
  padding-right: 8rem; /* pr-32 to make room for button */
  font-size: 1.125rem; /* text-lg */
  background-color: transparent;
  border: none;
  border-radius: 9999px;
  color: #1c1917; /* stone-900 */

  &:focus {
    outline: none;
    box-shadow: none; // Removing default ring
  }

  &::placeholder {
    color: #a8a29e; /* stone-400 */
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: #a8a29e; /* stone-400 */
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  bottom: 0.5rem;
  background-color: #1c1917; /* stone-900 */
  color: white;
  padding: 0 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #292524; /* stone-800 */
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const TagLabel = styled.span`
  color: #78716c; /* stone-500 */
  font-size: 0.875rem; /* text-sm */
  padding: 0.25rem 0;
`;

const TagButton = styled.button`
  font-size: 0.875rem; /* text-sm */
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: white;
  border: 1px solid #e7e5e4; /* stone-200 */
  color: #57534e; /* stone-600 */
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: #fff7ed; /* orange-50 */
    border-color: #fed7aa; /* orange-200 */
    color: #c2410c; /* orange-700 */
  }
`;

// --- Inline Icons (Replacements for external import) ---
const SearchIcon = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UtensilsIcon = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);

// --- Component Logic ---

const Hero = ({ onSearch, isSearching }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (onSearch) onSearch(inputValue);
    }
  };

  const quickCategories = [
    "Healthy Breakfast",
    "Quick Dinner",
    "Vegan Dessert",
    "Spicy Pasta",
  ];

  return (
    <Section>
      {/* Decorative Background Elements */}
      <Blob $variant="yellow" />
      <Blob $variant="orange" />

      <ContentWrapper>
        <Badge>
          <UtensilsIcon style={{ width: "1rem", height: "1rem" }} />
          <span>Discover your next favorite meal</span>
        </Badge>

        <Title>
          What are you{" "}
          <br style={{ display: "none" }} className="mobile-break" />
          {/* Note: In pure Styled components, controlling the <br> display usually requires a Media Query helper or inline style. 
              For simplicity, I left the br but the title will naturally wrap. */}
          <GradientText>craving today?</GradientText>
        </Title>

        <Subtitle>
          Unlock a world of culinary delights with our AI-powered recipe finder.
          From quick bites to gourmet feasts.
        </Subtitle>

        <FormContainer onSubmit={handleSubmit}>
          <GlowLayer />
          <InputWrapper>
            <IconWrapper>
              <SearchIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            </IconWrapper>
            <StyledInput
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search recipes, ingredients, or moods..."
            />
            <SearchButton type="submit" disabled={isSearching}>
              {isSearching ? "Cooking..." : "Find"}
            </SearchButton>
          </InputWrapper>
        </FormContainer>

        <TagContainer>
          <TagLabel>Try:</TagLabel>
          {quickCategories.map((cat) => (
            <TagButton
              key={cat}
              type="button"
              onClick={() => {
                setInputValue(cat);
                if (onSearch) onSearch(cat);
              }}
            >
              {cat}
            </TagButton>
          ))}
        </TagContainer>
      </ContentWrapper>
      <Popular />
      <Veggie />
    </Section>
  );
};

export default Hero;
