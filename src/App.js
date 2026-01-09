// App.js
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Favbutton from "./components/Favbutton";
import styled from "styled-components";
import { BrowserRouter, Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { AuthContext } from "./Firebase/AuthContext";
import React, { useCallback, useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyle"; // Import the Global Styles
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const login = useCallback(() => SetIsLoggedIn(true), []);
  const logout = useCallback(() => SetIsLoggedIn(false), []);

  const handleSearch = useCallback((searchTerm) => {
    window.location.href = `/searched/${searchTerm}`;
  }, []);

  return (
    <div className="App">
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <Nav>
            <NavContainer>
              <Logo to={"/"}>
                <GiKnifeFork />
                <span>Flavorful Finds</span>
              </Logo>
              
              <DesktopActions>
                {isLoggedIn ? <Favbutton /> : null}
                {isLoggedIn ? <Logout /> : <Login />}
              </DesktopActions>

              <HamburgerButton onClick={toggleMenu} isOpen={isMenuOpen}>
                <span />
                <span />
                <span />
              </HamburgerButton>
            </NavContainer>
          </Nav>

          {isMenuOpen && windowWidth <= 768 && (
            <MobileMenu>
              <Search /> {/* Moved Search here for mobile */}
              <div className="menu-items">
                 {isLoggedIn ? <Favbutton /> : null}
                 {isLoggedIn ? <Logout /> : <Login />}
              </div>
            </MobileMenu>
          )}

          <MainContent>
            <PageContent>
              <Pages onSearch={handleSearch} />
            </PageContent>
          </MainContent>
          <Footer />  
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

// Styled Components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid #e6e6e6;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  font-style: italic;
  color: #313131;
  svg {
    font-size: 2rem;
    color: #e94057; /* Modern Red Accent */
    margin-right: 0.5rem;
  }
`;

const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  span {
    width: 2rem;
    height: 0.25rem;
    background: #313131;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
      transform: ${({ isOpen }) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 999;
  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const MainContent = styled.main`
  margin-top: 80px; /* Offset for fixed nav */
  min-height: calc(100vh - 80px);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(253, 224, 71, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const PageContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
  margin-top: 1rem;
  min-height: 40vh;
`;

export default App;