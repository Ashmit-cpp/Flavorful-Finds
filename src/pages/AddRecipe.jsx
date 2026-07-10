import React, { useState } from "react";
import styled from "styled-components";

export default function AddRecipe() {
  const [sent, setSent] = useState(false);
  return (
    <Page>
      <Intro><p className="eyebrow">A recipe of your own</p><h1>Bring something<br/><em>to the table.</em></h1><p>Share the dish you return to—the one with a story, a generous hand, or a small secret worth passing on.</p></Intro>
      <Form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        {sent ? <ThankYou><span>Received</span><h2>Thank you.<br/>Sol will take good care of it.</h2><button type="button" onClick={() => setSent(false)}>Add another recipe</button></ThankYou> : <>
          <label><span>Recipe name</span><input required placeholder="e.g. Sunday lemon chicken" /></label>
          <label><span>Image URL</span><input type="url" placeholder="https://" /></label>
          <label><span>Ingredients</span><textarea required rows="6" placeholder="One ingredient per line" /></label>
          <label><span>The method</span><textarea required rows="8" placeholder="Tell us how it comes together" /></label>
          <button type="submit">Submit to Sol</button>
        </>}
      </Form>
    </Page>
  );
}

const Page = styled.section`display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(3rem,8vw,8rem);padding:clamp(5rem,9vw,9rem) clamp(1.25rem,7vw,7.5rem);background:var(--paper);@media(max-width:850px){grid-template-columns:1fr}`;
const Intro = styled.div`.eyebrow{color:var(--oxblood)}h1{font-size:clamp(4rem,7vw,7rem);letter-spacing:-.05em;margin:0 0 2rem;em{color:var(--oxblood);font-weight:400}}p:last-child{max-width:440px;color:#746d63}`;
const Form = styled.form`padding:clamp(1.5rem,4vw,3rem);background:var(--ink);color:var(--paper);display:grid;gap:1.5rem;box-shadow:20px 20px 0 var(--oxblood);label{display:grid;gap:.6rem}label span{font-size:.58rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--saffron)}input,textarea{width:100%;border:0;border-bottom:1px solid rgba(242,237,228,.25);background:transparent;color:var(--paper);padding:.8rem 0;outline:0;resize:vertical}button{padding:1rem;border:0;background:var(--saffron);color:var(--ink);font-size:.65rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}`;
const ThankYou = styled.div`min-height:460px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;span{font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:var(--saffron)}h2{font-size:clamp(2.8rem,5vw,4.5rem);margin:1rem 0 2rem}`;
