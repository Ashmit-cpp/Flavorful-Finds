import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { FiArrowLeft, FiClock, FiHeart, FiUsers, FiArrowUpRight } from "react-icons/fi";

const fallback = {
  title: "Charred roots with saffron & sorrel",
  image: "/sol-hero.png",
  sourceName: "The Sol kitchen",
  readyInMinutes: 32,
  servings: 2,
  summary: "A deeply savoury, quietly elegant plate built around the sweetness of charred vegetables. Saffron brings warmth; sorrel keeps everything lifted.",
  extendedIngredients: [
    { id: 1, original: "8 young carrots, scrubbed" }, { id: 2, original: "A generous knob of cultured butter" },
    { id: 3, original: "1 pinch saffron threads" }, { id: 4, original: "A small handful of sorrel or tender herbs" },
    { id: 5, original: "1 lemon, zest and juice" }, { id: 6, original: "Sea salt and cracked black pepper" },
  ],
  instructions: "<ol><li>Warm a heavy pan until nearly smoking. Dress the carrots with oil and salt, then char until deeply coloured.</li><li>Lower the heat. Add butter and baste until glossy and just tender.</li><li>Bloom saffron in two tablespoons of warm water. Whisk into the pan juices with lemon.</li><li>Spoon onto a warm plate, finish with sorrel, lemon zest, and a final turn of pepper.</li></ol>"
};

export default function Recipe() {
  const { name: id } = useParams();
  const [details, setDetails] = useState(fallback);
  const [tab, setTab] = useState("ingredients");
  const [isFav, setIsFav] = useState(false);
  const [similar, setSimilar] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    window.scrollTo(0, 0); setTab("ingredients");
    if (!id || !process.env.REACT_APP_API_KEY) return;
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`).then((r) => r.json()).then((data) => { if (data.title) setDetails(data); }).catch(() => {});
    fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=3`).then((r) => r.json()).then((data) => setSimilar(Array.isArray(data) ? data : [])).catch(() => {});
    if (userEmail) { const ref = doc(getFirestore(), "user", userEmail); getDoc(ref).then((snap) => setIsFav((snap.data()?.RID || []).includes(id))).catch(() => {}); }
  }, [id, userEmail]);

  const toggleFavorite = async () => {
    if (!userEmail) return;
    try { await updateDoc(doc(getFirestore(), "user", userEmail), { RID: isFav ? arrayRemove(id) : arrayUnion(id) }); setIsFav(!isFav); } catch (_) {}
  };

  return (
    <Page>
      <Hero>
        <Photo src={details.image || fallback.image} alt={details.title} />
        <Shade />
        <Back to="/"><FiArrowLeft /> Back to the edit</Back>
        <HeroCopy><p className="eyebrow">{details.sourceName || "The Sol kitchen"}</p><h1>{details.title}</h1><Meta><span><FiClock />{details.readyInMinutes || 32} minutes</span><span><FiUsers />Serves {details.servings || 2}</span></Meta></HeroCopy>
        {userEmail && <Save onClick={toggleFavorite} $active={isFav}><FiHeart />{isFav ? "Saved" : "Save"}</Save>}
      </Hero>

      <Body>
        <Summary><p className="eyebrow">Why it works</p><div dangerouslySetInnerHTML={{ __html: details.summary || fallback.summary }} /></Summary>
        <RecipeBody>
          <Tabs><button onClick={() => setTab("ingredients")} className={tab === "ingredients" ? "active" : ""}>01 Ingredients</button><button onClick={() => setTab("method")} className={tab === "method" ? "active" : ""}>02 Method</button></Tabs>
          <Panel>
            {tab === "ingredients" ? <Ingredients>{(details.extendedIngredients || fallback.extendedIngredients).map((item, index) => <li key={`${item.id}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{item.original}</li>)}</Ingredients> : <Method dangerouslySetInnerHTML={{ __html: details.instructions || fallback.instructions }} />}
          </Panel>
          <SolNote><span>Sol’s note</span><p>Let colour be your cue. The darker the edges, the more character the finished dish will carry.</p></SolNote>
        </RecipeBody>

        {similar.length > 0 && <Similar><p className="eyebrow">Continue cooking</p><h2>Something for tomorrow</h2><Grid>{similar.map((recipe) => <Link key={recipe.id} to={`/recipe/${recipe.id}`}><span>{recipe.title}</span><FiArrowUpRight /></Link>)}</Grid></Similar>}
      </Body>
    </Page>
  );
}

const Page = styled.div`background:var(--paper);`;
const Hero = styled.section`position:relative;min-height:calc(100svh - 76px);display:flex;align-items:flex-end;padding:clamp(2rem,6vw,6rem);color:var(--paper);background:var(--ink);overflow:hidden;`;
const Photo = styled.img`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.72);`;
const Shade = styled.div`position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,17,15,.93),rgba(18,17,15,.22)),linear-gradient(0deg,rgba(18,17,15,.85),transparent 65%);`;
const Back = styled(Link)`position:absolute;top:2rem;left:clamp(1.25rem,6vw,6rem);display:flex;align-items:center;gap:.6rem;font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;`;
const HeroCopy = styled.div`position:relative;max-width:900px;.eyebrow{color:var(--saffron)}h1{max-width:12ch;margin:0;font-size:clamp(4rem,9vw,8.5rem);letter-spacing:-.055em}`;
const Meta = styled.div`display:flex;gap:1.5rem;margin-top:2rem;span{display:flex;align-items:center;gap:.45rem;font-size:.65rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase}`;
const Save = styled.button`position:absolute;right:clamp(1.25rem,6vw,6rem);bottom:clamp(2rem,6vw,6rem);display:flex;align-items:center;gap:.5rem;padding:.9rem 1rem;border:1px solid rgba(255,255,255,.35);background:${({$active})=>$active?'var(--paper)':'rgba(18,17,15,.3)'};color:${({$active})=>$active?'var(--ink)':'var(--paper)'};font-size:.62rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;backdrop-filter:blur(12px);@media(max-width:680px){top:2rem;bottom:auto}`;
const Body = styled.main`padding:clamp(5rem,9vw,9rem) clamp(1.25rem,7vw,7.5rem);`;
const Summary = styled.section`display:grid;grid-template-columns:.45fr 1fr;gap:2rem;max-width:980px;margin-bottom:6rem;.eyebrow{color:var(--oxblood)}div{font-family:var(--serif);font-size:clamp(1.7rem,3vw,2.6rem);line-height:1.35;color:#4f4942}p{margin:0}@media(max-width:700px){grid-template-columns:1fr}`;
const RecipeBody = styled.section`display:grid;grid-template-columns:220px minmax(0,1fr) 260px;gap:clamp(2rem,5vw,5rem);padding-top:3rem;border-top:1px solid var(--line);@media(max-width:940px){grid-template-columns:1fr}`;
const Tabs = styled.nav`display:flex;flex-direction:column;align-items:flex-start;gap:1rem;button{padding:.5rem 0;border:0;background:none;color:#8a8277;font-size:.63rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.active{color:var(--oxblood);border-bottom:1px solid var(--oxblood)}@media(max-width:940px){flex-direction:row}`;
const Panel = styled.div`max-width:720px;`;
const Ingredients = styled.ol`list-style:none;margin:0;padding:0;li{display:grid;grid-template-columns:3rem 1fr;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:1.35rem;span{font-family:var(--sans);font-size:.58rem;color:var(--oxblood);letter-spacing:.12em}}`;
const Method = styled.div`font-family:var(--serif);font-size:1.28rem;line-height:1.65;ol{padding-left:1.2rem}li{padding:0 0 1.2rem .7rem}`;
const SolNote = styled.aside`align-self:start;padding:1.5rem;border-top:3px solid var(--saffron);background:var(--ink);color:var(--paper);span{font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--saffron)}p{margin:1rem 0 0;font-family:var(--serif);font-size:1.25rem;font-style:italic;line-height:1.45}`;
const Similar = styled.section`margin-top:8rem;.eyebrow{color:var(--oxblood)}h2{font-size:clamp(3.5rem,6vw,6rem);margin:0 0 2rem}`;
const Grid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);a{display:flex;justify-content:space-between;gap:1rem;padding:1.5rem 1rem;border-right:1px solid var(--line);font-family:var(--serif);font-size:1.4rem}@media(max-width:700px){grid-template-columns:1fr}`;
