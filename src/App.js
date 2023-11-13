import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Favbutton from "./components/Favbutton";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "./Firebase/AuthContext";
import React, { useCallback, useState, useEffect } from "react";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  const login = useCallback(() => {
    SetIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    SetIsLoggedIn(false);
  }, []);

  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <div className="App">
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <Nav>
            <LogoAndText>
              <Logo to={"/"}>
                <GiKnifeFork className="logo-icon" />
                Flavorful Finds
              </Logo>
              <Search />
            </LogoAndText>
            {windowWidth <= 768 ? (
              <HamburgerButton onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
              </HamburgerButton>
            ) : (
              <NavActions>
                {isLoggedIn ? <Favbutton /> : null}
                {isLoggedIn ? <Logout /> : <Login />}
              </NavActions>
            )}
          </Nav>
          {isMenuOpen && windowWidth <= 768 && (
            <MobileMenu>
              {isLoggedIn ? <Favbutton /> : null}
              {isLoggedIn ? <Logout /> : <Login />}
            </MobileMenu>
          )}
          <MainContent>
            <Category />
            <Pages />
          </MainContent>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}
const LogoAndText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Lobster Two", cursive;

  .logo-icon {
    font-size: 2.5rem;
    color: #e64f29;
    margin-right: 1rem;
  }
`;

const HamburgerButton = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: #fff;
    margin: 6px 0;
    transition: 0.4s;
  }

  &:hover div {
    background-color: #e64f29;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 223, 183, 0.9);
  z-index: 1000;
  position: absolute;
  top: 100px;
  width: 100%;
  padding: 10px;
`;

const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 223, 183, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  color: #fff;
  z-index: 1000;
  padding: 2px 8px 0px;

  @media (min-width: 769px) {
    justify-content: space-between;
  }
`;

const MainContent = styled.div`
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 120px;
  }
`;
export default App;
