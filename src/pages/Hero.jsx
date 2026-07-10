import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiArrowRight, FiPlus, FiX, FiClock, FiUsers, FiStar } from "react-icons/fi";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";

const suggestions = ["miso", "aubergine", "lemons", "brown butter"];

const compositions = {
  default: { title: "Miso-glazed aubergine", detail: "Brown butter dashi · charred lemon · sesame", time: "32 min", serves: "2", level: "Considered" },
  bright: { title: "Charred lemon orzo", detail: "Herb oil · whipped feta · bitter leaves", time: "24 min", serves: "2", level: "Effortless" },
  warm: { title: "Brown butter supper", detail: "Silky beans · roast alliums · sourdough", time: "38 min", serves: "4", level: "Generous" },
};

function Hero({ onSearch }) {
  const [ingredients, setIngredients] = useState(["miso", "aubergine"]);
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [version, setVersion] = useState("default");
  const result = compositions[version];

  const remaining = useMemo(() => suggestions.filter((item) => !ingredients.includes(item)), [ingredients]);

  const addIngredient = (value) => {
    const next = value.trim().toLowerCase();
    if (next && !ingredients.includes(next)) setIngredients((items) => [...items, next]);
    setInput("");
  };

  const compose = () => {
    if (!ingredients.length) return;
    setIsComposing(true);
    window.setTimeout(() => {
      setVersion(ingredients.some((item) => item.includes("lemon")) ? "bright" : ingredients.some((item) => item.includes("butter")) ? "warm" : "default");
      setIsComposing(false);
    }, 650);
  };

  return (
    <Page>
      <HeroStage>
        <ImagePanel role="img" aria-label="A candlelit dish of glazed carrots in a dark ceramic bowl" />
        <Grain />
        <HeroCopy>
          <p className="eyebrow">Culinary intelligence, intuitively yours</p>
          <h1>Your taste,<br/><em>beautifully</em> understood.</h1>
          <Intro>Sol turns what you have, how you feel, and who is coming to dinner into something worth lingering over.</Intro>
          <HeroActions>
            <Primary href="#sol-studio">Compose with Sol <FiArrowRight /></Primary>
            <TextLink href="#the-edit">Explore today’s edit <span>↓</span></TextLink>
          </HeroActions>
        </HeroCopy>
        <Caption><span>01</span><p>Charred carrot<br/>Saffron · sorrel · smoke</p></Caption>
        <Edition>Edition No. 07<br/>Summer, slowly</Edition>
      </HeroStage>

      <Studio id="sol-studio">
        <StudioIntro>
          <p className="eyebrow">The Sol studio</p>
          <h2>Dinner begins<br/>with what’s already there.</h2>
          <p>Give Sol a handful of ingredients. It reads between the lines—balancing mood, time, technique, and the quiet pleasure of a well-made plate.</p>
          <StudioProof><strong>9,482</strong><span>thoughtful recipes<br/>composed this week</span></StudioProof>
        </StudioIntro>

        <Console>
          <ConsoleTop><span>Tonight’s mise en place</span><small>Sol · online</small></ConsoleTop>
          <Prompt>What are we working with?</Prompt>
          <IngredientWell>
            {ingredients.map((item) => <Chip key={item}>{item}<button aria-label={`Remove ${item}`} onClick={() => setIngredients((items) => items.filter((x) => x !== item))}><FiX /></button></Chip>)}
            <IngredientInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIngredient(input); } }}
              placeholder="Add an ingredient…"
              aria-label="Add an ingredient"
            />
          </IngredientWell>
          <Suggestions>{remaining.slice(0, 3).map((item) => <button key={item} onClick={() => addIngredient(item)}><FiPlus /> {item}</button>)}</Suggestions>
          <ComposeButton onClick={compose} disabled={!ingredients.length || isComposing}>{isComposing ? "Composing…" : "Compose a dish"}<FiArrowRight /></ComposeButton>

          <Result aria-live="polite" $loading={isComposing}>
            <ResultImage />
            <ResultCopy>
              <small>Sol suggests</small>
              <h3>{result.title}</h3>
              <p>{result.detail}</p>
              <ResultMeta>
                <span><FiClock /> {result.time}</span><span><FiUsers /> {result.serves}</span><span><FiStar /> {result.level}</span>
              </ResultMeta>
              <button onClick={() => onSearch?.(result.title)}>Open the recipe <FiArrowRight /></button>
            </ResultCopy>
          </Result>
        </Console>
      </Studio>

      <Manifesto>
        <span>Sol thinks like a cook.</span>
        <p>Not a database. Not a list of links. A considered answer to the oldest daily question:</p>
        <blockquote>“What would be lovely tonight?”</blockquote>
      </Manifesto>

      <RecipeBand id="the-edit"><Popular /><Veggie /></RecipeBand>
    </Page>
  );
}

const reveal = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}`;
const Page = styled.section`overflow:hidden;background:var(--paper);`;
const HeroStage = styled.section`
  position:relative;min-height:calc(100svh - 76px);background:var(--ink);color:var(--paper);isolation:isolate;
  display:flex;align-items:center;padding:clamp(4rem,8vw,8rem) clamp(1.25rem,7vw,7.5rem);
`;
const ImagePanel = styled.div`
  position:absolute;z-index:-2;inset:0;background-image:url('/sol-hero.png');background-size:cover;background-position:center;
  &::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,17,15,.98) 0%,rgba(18,17,15,.82) 34%,rgba(18,17,15,.16) 72%),linear-gradient(0deg,rgba(18,17,15,.7),transparent 48%)}
  @media(max-width:700px){background-position:62% center;&::after{background:linear-gradient(180deg,rgba(18,17,15,.28),rgba(18,17,15,.97) 70%)}}
`;
const Grain = styled.div`position:absolute;z-index:-1;inset:0;opacity:.12;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.38'/%3E%3C/svg%3E")`;
const HeroCopy = styled.div`
  max-width:760px;animation:${reveal} .8s ease both;
  .eyebrow{color:var(--saffron)}
  h1{margin:0;font-size:clamp(4.3rem,9.2vw,9rem);letter-spacing:-.055em;line-height:.74} h1 em{font-weight:400;color:var(--saffron)}
  @media(max-width:700px){align-self:flex-end;padding-bottom:5rem;h1{font-size:clamp(4rem,20vw,7rem);line-height:.79}}
`;
const Intro = styled.p`max-width:580px;margin:2.3rem 0;color:rgba(242,237,228,.72);font-family:var(--serif);font-size:clamp(1.2rem,2vw,1.55rem);line-height:1.45;`;
const HeroActions = styled.div`display:flex;align-items:center;gap:2rem;flex-wrap:wrap;`;
const Primary = styled.a`display:inline-flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--paper);color:var(--ink);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;transition:.25s;&:hover{background:var(--saffron);gap:1.4rem}`;
const TextLink = styled.a`font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid rgba(242,237,228,.35);padding:.8rem 0;span{color:var(--saffron);margin-left:.5rem}`;
const Caption = styled.div`position:absolute;right:5vw;bottom:3rem;display:flex;gap:1rem;align-items:flex-start;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;span{font-family:var(--serif);font-size:1.8rem;color:var(--saffron);line-height:.8}p{margin:0;color:rgba(242,237,228,.62)}@media(max-width:700px){display:none}`;
const Edition = styled.div`position:absolute;right:2rem;top:7rem;writing-mode:vertical-rl;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(242,237,228,.45);@media(max-width:700px){display:none}`;

const Studio = styled.section`display:grid;grid-template-columns:minmax(0,.78fr) minmax(520px,1.22fr);gap:clamp(3rem,8vw,8rem);padding:clamp(5rem,10vw,10rem) clamp(1.25rem,7vw,7.5rem);background:var(--paper);@media(max-width:980px){grid-template-columns:1fr}`;
const StudioIntro = styled.div`
  align-self:center;max-width:520px;.eyebrow{color:var(--oxblood)}h2{font-size:clamp(3.8rem,6vw,6.3rem);letter-spacing:-.045em;margin:0 0 2rem}p{max-width:440px;color:#686157;line-height:1.8}
`;
const StudioProof = styled.div`display:flex;align-items:center;gap:1.2rem;margin-top:3rem;padding-top:1.4rem;border-top:1px solid var(--line);strong{font-family:var(--serif);font-size:2.6rem;font-weight:500}span{font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:#777064}`;
const Console = styled.div`position:relative;background:var(--ink);color:var(--paper);padding:clamp(1.4rem,3vw,2.4rem);box-shadow:22px 26px 0 var(--oxblood),0 40px 80px rgba(31,24,17,.18);`;
const ConsoleTop = styled.div`display:flex;justify-content:space-between;padding-bottom:1.4rem;border-bottom:1px solid rgba(242,237,228,.12);font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;small{color:#9cbe83;&::before{content:"";display:inline-block;width:6px;height:6px;margin-right:.5rem;border-radius:50%;background:#9cbe83;box-shadow:0 0 10px #9cbe83}}`;
const Prompt = styled.h3`font-size:clamp(2rem,4vw,3.1rem);margin:2rem 0 1rem;`;
const IngredientWell = styled.div`display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;min-height:70px;padding:.8rem;border:1px solid rgba(242,237,228,.25);background:rgba(255,255,255,.04);`;
const Chip = styled.span`display:flex;align-items:center;gap:.5rem;padding:.55rem .7rem;background:var(--paper);color:var(--ink);font-size:.74rem;font-weight:600;button{display:flex;border:0;background:none;padding:0;color:var(--oxblood)}`;
const IngredientInput = styled.input`min-width:150px;flex:1;border:0;outline:0;background:transparent;color:var(--paper);padding:.5rem;&::placeholder{color:rgba(242,237,228,.38)}`;
const Suggestions = styled.div`display:flex;gap:.5rem;margin:1rem 0 1.4rem;flex-wrap:wrap;button{display:flex;align-items:center;gap:.35rem;border:0;background:none;color:rgba(242,237,228,.54);font-size:.7rem;&:hover{color:var(--saffron)}}`;
const ComposeButton = styled.button`width:100%;display:flex;justify-content:space-between;align-items:center;padding:1rem 1.1rem;border:0;background:var(--saffron);color:var(--ink);font-size:.7rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;&:disabled{opacity:.55}`;
const Result = styled.div`display:grid;grid-template-columns:145px 1fr;margin-top:1.4rem;border-top:1px solid rgba(242,237,228,.12);padding-top:1.4rem;transition:.3s;opacity:${({$loading})=>$loading?.45:1};filter:${({$loading})=>$loading?'blur(2px)':'none'};@media(max-width:560px){grid-template-columns:1fr}`;
const ResultImage = styled.div`min-height:190px;background:url('/hero-bg.png') center/cover;filter:saturate(.72) contrast(1.08);`;
const ResultCopy = styled.div`padding:.3rem 0 .3rem 1.4rem;small{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--saffron)}h3{font-size:2rem;margin:.6rem 0 .25rem}p{font-size:.72rem;color:rgba(242,237,228,.55)}button{display:flex;align-items:center;gap:.6rem;margin-top:1.2rem;padding:0;border:0;background:none;color:var(--paper);font-size:.66rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}@media(max-width:560px){padding:1rem 0 0}`;
const ResultMeta = styled.div`display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1rem;span{display:flex;align-items:center;gap:.3rem;font-size:.6rem;color:rgba(242,237,228,.65)}`;
const Manifesto = styled.section`padding:clamp(5rem,10vw,10rem) 1.25rem;text-align:center;background:var(--oxblood);color:var(--paper);span{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--saffron)}p{max-width:570px;margin:2rem auto 1rem;color:rgba(242,237,228,.66)}blockquote{margin:0;font-family:var(--serif);font-size:clamp(3rem,7vw,6rem);font-style:italic;line-height:1}`;
const RecipeBand = styled.div`padding:clamp(5rem,8vw,8rem) 0;background:var(--paper);`;

export default Hero;
