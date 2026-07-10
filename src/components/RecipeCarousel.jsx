import React, { useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiClock, FiHeart } from "react-icons/fi";

const fallback = [
  { id: 654, title: "Charred tomato & saffron rigatoni", image: "/hero-bg.png", readyInMinutes: 28 },
  { id: 655, title: "Glazed roots with cultured cream", image: "/sol-hero.png", readyInMinutes: 34 },
  { id: 656, title: "Late-summer pasta, basil & almond", image: "/hero-bg.png", readyInMinutes: 22 },
  { id: 657, title: "Aubergine over brown butter dashi", image: "/sol-hero.png", readyInMinutes: 31 },
];

export default function RecipeCarousel({ eyebrow, title, intro, recipes = [], vegetarian = false }) {
  const [liked, setLiked] = useState({});
  const items = recipes.length ? recipes : fallback;

  return (
    <Section>
      <Header>
        <TitleBlock><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></TitleBlock>
        <Intro>{intro}</Intro>
        <AllLink to="/cuisine/Mediterranean">View the full edit <FiArrowUpRight /></AllLink>
      </Header>
      <Splide options={{ perPage: 3, gap: "1.25rem", arrows: true, pagination: false, drag: "free", breakpoints: { 900: { perPage: 2 }, 590: { perPage: 1, padding: { right: "14%" }, arrows: false } } }}>
        {items.map((recipe, index) => (
          <SplideSlide key={`${recipe.id}-${index}`}>
            <Card to={`/recipe/${recipe.id}`}>
              <ImageWrap><img src={recipe.image || "/hero-bg.png"} alt={recipe.title} />{vegetarian && <Badge>Plant-led</Badge>}<Number>0{index + 1}</Number></ImageWrap>
              <CardInfo>
                <div><Meta><FiClock /> {recipe.readyInMinutes || 20 + (recipe.id % 35)} min</Meta><h3>{recipe.title}</h3></div>
                <Heart aria-label="Save recipe" $liked={liked[recipe.id]} onClick={(event) => { event.preventDefault(); setLiked((state) => ({ ...state, [recipe.id]: !state[recipe.id] })); }}><FiHeart /></Heart>
              </CardInfo>
              <RecipeNote>{index % 2 ? "Deeply savoury · quietly impressive" : "Bright flavours · elegant technique"}</RecipeNote>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Section>
  );
}

const Section = styled.section`
  width:min(100% - 2.5rem,1320px);margin:0 auto clamp(6rem,10vw,10rem);
  .splide__track{overflow:visible}.splide__arrow{width:3rem;height:3rem;border:1px solid var(--line);border-radius:0;background:var(--paper);opacity:1}.splide__arrow--prev{left:-1.5rem}.splide__arrow--next{right:-1.5rem}
`;
const Header = styled.header`display:grid;grid-template-columns:1.1fr .8fr auto;align-items:end;gap:2rem;margin-bottom:2.5rem;padding-bottom:1.4rem;border-bottom:1px solid var(--line);@media(max-width:820px){grid-template-columns:1fr}.eyebrow{color:var(--oxblood)}`;
const TitleBlock = styled.div`h2{margin:0;font-size:clamp(3.2rem,6vw,5.4rem);letter-spacing:-.04em}`;
const Intro = styled.p`max-width:370px;margin:0;color:#746d63;font-size:.86rem;line-height:1.7;`;
const AllLink = styled(Link)`display:flex;align-items:center;gap:.55rem;padding-bottom:.2rem;font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;`;
const Card = styled(Link)`display:block;color:var(--ink);&:hover img{transform:scale(1.035);filter:saturate(.95)}&:hover h3{color:var(--oxblood)}`;
const ImageWrap = styled.div`position:relative;height:clamp(300px,37vw,500px);overflow:hidden;background:var(--ink);img{width:100%;height:100%;object-fit:cover;transition:.7s cubic-bezier(.2,.8,.2,1);filter:saturate(.78)}`;
const Badge = styled.span`position:absolute;left:1rem;top:1rem;padding:.45rem .6rem;background:var(--paper);font-size:.55rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;`;
const Number = styled.span`position:absolute;right:1rem;bottom:.7rem;font-family:var(--serif);font-size:2rem;color:rgba(255,255,255,.75);`;
const CardInfo = styled.div`display:flex;justify-content:space-between;gap:1rem;padding:1.2rem 0 .6rem;border-bottom:1px solid var(--line);h3{margin:.45rem 0 0;font-size:clamp(1.65rem,2.6vw,2.25rem);line-height:1;transition:.2s}`;
const Meta = styled.span`display:flex;align-items:center;gap:.35rem;font-size:.57rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7a7267;`;
const Heart = styled.button`flex:0 0 auto;width:2.5rem;height:2.5rem;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:${({$liked})=>$liked?'var(--oxblood)':'transparent'};color:${({$liked})=>$liked?'var(--paper)':'var(--ink)'};svg{fill:${({$liked})=>$liked?'currentColor':'none'}}`;
const RecipeNote = styled.p`margin:.7rem 0 0;font-family:var(--serif);font-style:italic;color:#7c746a;`;
