import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const fallback = [
  { id: 654, title: "Saffron rigatoni with blistered tomato", image: "/hero-bg.png" },
  { id: 655, title: "Charred roots, cultured cream & sorrel", image: "/sol-hero.png" },
  { id: 656, title: "Silken aubergine with brown butter dashi", image: "/sol-hero.png" },
  { id: 657, title: "Late-summer pasta with basil", image: "/hero-bg.png" },
];

export default function RecipeGrid({ eyebrow, title, description, recipes = [] }) {
  const items = recipes.length ? recipes : fallback;
  return (
    <Page>
      <Header><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></Header>
      <Grid>
        {items.map((item, index) => <Card key={`${item.id}-${index}`} to={`/recipe/${item.id}`}><Image><img src={item.image || "/hero-bg.png"} alt={item.title}/><span>0{index + 1}</span></Image><Info><div><small>{index % 2 ? "Slow pleasure" : "Sol selected"}</small><h2>{item.title}</h2></div><FiArrowUpRight /></Info></Card>)}
      </Grid>
    </Page>
  );
}

const Page = styled.section`padding:clamp(5rem,9vw,9rem) clamp(1.25rem,6vw,6rem);min-height:80vh;background:var(--paper);`;
const Header = styled.header`max-width:820px;margin-bottom:clamp(3rem,7vw,6rem);.eyebrow{color:var(--oxblood)}h1{font-size:clamp(4.5rem,10vw,9rem);letter-spacing:-.055em;margin:0 0 1.5rem;text-transform:capitalize}p:last-child{max-width:510px;color:#746d63}`;
const Grid = styled.div`display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(2rem,5vw,6rem) clamp(1rem,3vw,3rem);@media(max-width:700px){grid-template-columns:1fr}`;
const Card = styled(Link)`display:block;&:nth-child(even){margin-top:clamp(2rem,8vw,8rem)}&:hover img{transform:scale(1.035);filter:saturate(.95)}@media(max-width:700px){&:nth-child(even){margin-top:0}}`;
const Image = styled.div`position:relative;height:clamp(300px,48vw,650px);overflow:hidden;background:var(--ink);img{width:100%;height:100%;object-fit:cover;filter:saturate(.72);transition:.7s}span{position:absolute;left:1rem;bottom:.6rem;color:rgba(255,255,255,.8);font-family:var(--serif);font-size:2.5rem}`;
const Info = styled.div`display:flex;justify-content:space-between;gap:1rem;padding:1.2rem 0;border-bottom:1px solid var(--line);small{font-size:.57rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--oxblood)}h2{font-size:clamp(1.8rem,3.2vw,3rem);margin:.5rem 0 0}svg{font-size:1.4rem}`;
