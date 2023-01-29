import Pages from "./pages/Pages"
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import  Search  from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav> 
        <GiKnifeFork className="logo-icon"/>
        <Logo to ={"/"} > Flavorful Finds</Logo>
      </Nav>
      
        <Search/>
        <Category />
        <Pages />
      </BrowserRouter>

    </div>
  );
}


const Logo = styled (Link)` 
text-decoration: none; 
font-size: 1.5rem; 
font-weight: 400;
font-family: 'Lobster Two', cursive;

`;

const Nav = styled.div`
   position: absolute;
   top: 2rem;
   
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem; 
    justify-content: flex-start;
    svg{
      font-size: 2rem;
    }
    .logo-icon{
      color: white;
      color: #7FC6A4;
      margin: 0.2rem;
 }
   
  `;

export default App;
