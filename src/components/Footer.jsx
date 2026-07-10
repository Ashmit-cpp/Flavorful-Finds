import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <FooterShell>
      <Top>
        <Brand><Sun aria-hidden="true" />Sol</Brand>
        <Statement>Eat well.<br/><em>Live warmly.</em></Statement>
        <Newsletter><span>Notes from the Sol kitchen</span><p>Seasonal ideas and considered recipes, occasionally.</p><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Email address" aria-label="Email address"/><button aria-label="Subscribe"><FiArrowUpRight /></button></form></Newsletter>
      </Top>
      <Bottom>
        <span>© {new Date().getFullYear()} Sol Culinary Studio</span>
        <nav><Link to="/cuisine/Italian">The edit</Link><Link to="/cuisine/Indian">Cuisines</Link><a href="/#sol-studio">Ask Sol</a></nav>
        <span>Made for the pleasure of dinner</span>
      </Bottom>
    </FooterShell>
  );
}

const FooterShell = styled.footer`background:var(--ink);color:var(--paper);padding:clamp(4rem,8vw,8rem) clamp(1.25rem,6vw,6rem) 2rem;`;
const Top = styled.div`display:grid;grid-template-columns:.6fr 1.2fr .8fr;gap:4rem;align-items:start;padding-bottom:5rem;@media(max-width:850px){grid-template-columns:1fr;gap:2.5rem}`;
const Brand = styled(Link)`display:flex;align-items:center;gap:.8rem;font-family:var(--serif);font-size:2.6rem;`;
const Sun = styled.i`width:30px;height:30px;border-radius:50%;border:1px solid var(--saffron);box-shadow:inset 0 0 0 9px var(--ink),inset 0 0 0 10px var(--saffron);`;
const Statement = styled.h2`margin:0;font-size:clamp(4rem,8vw,8rem);letter-spacing:-.05em;line-height:.75;em{color:var(--saffron);font-weight:400}`;
const Newsletter = styled.div`span{font-size:.64rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--saffron)}p{margin:1rem 0;color:rgba(242,237,228,.52);font-size:.8rem}form{display:flex;border-bottom:1px solid rgba(242,237,228,.3)}input{flex:1;padding:.8rem 0;border:0;background:none;color:var(--paper);outline:0}button{border:0;background:none;color:var(--paper);font-size:1.2rem}`;
const Bottom = styled.div`display:flex;justify-content:space-between;gap:2rem;padding-top:1.5rem;border-top:1px solid rgba(242,237,228,.12);font-size:.57rem;letter-spacing:.13em;text-transform:uppercase;color:rgba(242,237,228,.44);nav{display:flex;gap:1.5rem;color:var(--paper)}@media(max-width:750px){flex-direction:column;nav{order:-1}}`;
