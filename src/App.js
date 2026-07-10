import Pages from "./pages/Pages";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Favbutton from "./components/Favbutton";
import styled from "styled-components";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import { AuthContext } from "./Firebase/AuthContext";
import React, { useCallback, useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyle";
import Footer from "./components/Footer";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("email")));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);
  const handleSearch = useCallback((term) => { window.location.href = `/searched/${encodeURIComponent(term)}`; }, []);

  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <div className="App">
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <Nav>
            <Brand to="/" aria-label="Sol home">
              <SunMark aria-hidden="true"><i /><i /><i /></SunMark>
              <span>Sol</span>
            </Brand>
            <DesktopLinks aria-label="Main navigation">
              <NavLink to="/cuisine/Italian">The edit</NavLink>
              <NavLink to="/cuisine/Indian">Cuisines</NavLink>
              <a href="/#sol-studio">Sol studio</a>
            </DesktopLinks>
            <Actions>
              {isLoggedIn && <Favbutton />}
              <DesktopAuth>{isLoggedIn ? <Logout /> : <Login />}</DesktopAuth>
              <Concierge href="/#sol-studio">Ask Sol <FiArrowUpRight /></Concierge>
              <MenuButton onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </MenuButton>
            </Actions>
          </Nav>

          {isMenuOpen && (
            <MobileMenu>
              <NavLink to="/cuisine/Italian" onClick={() => setIsMenuOpen(false)}>The edit</NavLink>
              <NavLink to="/cuisine/Indian" onClick={() => setIsMenuOpen(false)}>Cuisines</NavLink>
              <a href="/#sol-studio" onClick={() => setIsMenuOpen(false)}>Sol studio</a>
              {isLoggedIn ? <Logout /> : <Login />}
            </MobileMenu>
          )}

          <Main><Pages onSearch={handleSearch} /></Main>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

const Nav = styled.nav`
  position: sticky; top: 0; z-index: 100;
  height: 76px; padding: 0 clamp(1rem, 4vw, 4rem);
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  background: rgba(18, 17, 15, .93); color: var(--paper);
  border-bottom: 1px solid rgba(242, 237, 228, .12); backdrop-filter: blur(18px);

  @media(max-width:900px){
    grid-template-columns: minmax(0, 1fr) auto;
    padding-inline: 1.15rem;
  }
`;

const Brand = styled(Link)`display:flex;align-items:center;gap:.8rem;width:max-content;font-family:var(--serif);font-size:2rem;line-height:1;color:var(--paper);`;
const SunMark = styled.span`
  position:relative;display:grid;place-items:center;width:24px;height:24px;border:1px solid var(--saffron);border-radius:50%;
  &::after{content:"";width:7px;height:7px;border-radius:50%;background:var(--saffron);box-shadow:0 0 18px var(--saffron)}
  i{position:absolute;width:1px;height:32px;background:rgba(212,168,93,.55);transform:rotate(0)}
  i:nth-child(2){transform:rotate(60deg)} i:nth-child(3){transform:rotate(120deg)}
`;
const DesktopLinks = styled.div`
  display:flex;gap:2.6rem;font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  a{opacity:.72;transition:opacity .2s;color:var(--paper)} a:hover,a.active{opacity:1}
  @media(max-width:900px){display:none}
`;
const Actions = styled.div`
  display:flex;justify-content:flex-end;align-items:center;gap:.7rem;
  @media(max-width:900px){grid-column:2}
`;
const DesktopAuth = styled.div`@media(max-width:1100px){display:none}`;
const Concierge = styled.a`
  display:inline-flex;align-items:center;gap:.5rem;padding:.68rem 1rem;border:1px solid rgba(242,237,228,.34);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  transition:.25s ease;&:hover{background:var(--paper);color:var(--ink)}
  @media(max-width:560px){display:none}
`;
const MenuButton = styled.button`display:none;border:0;background:none;color:var(--paper);font-size:1.5rem;padding:.4rem;@media(max-width:900px){display:flex}`;
const MobileMenu = styled.div`
  position:fixed;inset:76px 0 auto;z-index:99;padding:2rem;display:grid;gap:1.25rem;background:var(--ink);color:var(--paper);border-bottom:1px solid rgba(255,255,255,.12);
  a{font-family:var(--serif);font-size:2rem}
`;
const Main = styled.main`min-height:70vh;background:var(--paper);`;

export default App;
