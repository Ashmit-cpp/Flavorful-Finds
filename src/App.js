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
import React, { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

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
              <GiKnifeFork className="logo-icon" />
              <Logo to={"/"}> Flavorful Finds</Logo>
            </LogoAndText>
            <NavBottom>
              <Search />
              {isLoggedIn ? <Favbutton /> : null}
              {isLoggedIn ? <Logout /> : <Login />}
            </NavBottom>
          </Nav>
          <Category />
          <Pages />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

const LogoAndText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-icon {
    font-size: 2.5rem;
    color: #e64f29;
    margin-right: 1rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  background: rgba(255, 223, 183, 0.9);
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 7px;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const NavBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export default App;
