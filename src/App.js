import Pages from "./pages/Pages"
import Category from "./components/Category";
import  Search  from "./components/Search";
import Login from "./components/Login";
import Logout from "./components/Logout";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "./Firebase/AuthContext";
import React,{ useCallback, useState, useContext } from "react";

function App() {

  const [isLoggedIn, SetIsLoggedIn] =  useState(false);

  const login= useCallback(()=>{
    SetIsLoggedIn(true);
  },[]);

  const logout= useCallback(()=>{
    SetIsLoggedIn(false);
  },[]);

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
          <GiKnifeFork className="logo-icon"/>
          <Logo to ={"/"} > Flavorful Finds</Logo>
          <Search/>
          {!localStorage.getItem("uid") ? (<Login/>) : (<Logout/>)}
        </Nav>
          <Category />
          <Pages />
        </BrowserRouter>
      </AuthContext.Provider>

    </div>
  );
}


const Logo = styled (Link)` 
margin: 1rem 2rem 1rem 0rem; 
text-decoration: none; 
font-size: 1.5rem; 
font-weight: 400;
font-family: 'Lobster Two', cursive;

`;

const Nav = styled.div`

  background: rgba(255, 223, 183, 0.9);
  display: flex;
  align-items: center;
  color: #fff;
  padding: 7px;
    svg{
      font-size: 1rem;
    }
    .logo-icon{
      font-size: 2.5rem;
      color: #e64f29;
      margin: 0.2rem;
 }
   
  `;

export default App;

/// changes check