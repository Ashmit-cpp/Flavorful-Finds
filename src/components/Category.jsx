import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiBowlOfRice } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
    return (
        <List>
            <Slink to={'/cuisine/Indian'}>
                <FaPizzaSlice />
                <h4>Indian</h4>
            </Slink>
            <Slink to={'/cuisine/American'}>
                <FaHamburger />
                <h4>American</h4>
            </Slink>
            <Slink to={'/cuisine/Thai'}>
                <GiNoodles />
                <h4>Thai</h4>
            </Slink>
            <Slink to={'/cuisine/Chinese'}>
                <GiBowlOfRice />
                <h4>Chinese</h4>
            </Slink>
        </List>
    );
}


const List = styled.div` 
display: flex;
justify-content: center; 
margin: 1rem 1.5rem;
`;

const Slink = styled(NavLink)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 10%;
  margin-right: 1rem;
  text-decoration: none;
  background: #ffab40;
  width: 50rem;
  height: 5rem;
  cursor: pointer;
  transform: scale(0.75);
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  h4 {
    color: #292421;
    font-size: 1.2rem;
  }

  svg {
    color: #292421;
    font-size: 1.6rem;
  }

  &:hover {
    background: #ffca7a;
    transform: scale(0.8);
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 171, 64, 0.3);
  }

  &::before {
    content: ""; /* Optional icon here, for example, using Font Awesome */
    display: inline-block;
    margin-bottom: 0.5rem;
    font-family: "Font Awesome"; /* Replace with the appropriate font */
    font-size: 1.6rem;
    color: #564f48; /* Icon color */
  }

  /* Ripple effect */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  &:active::after {
    width: 150%;
    height: 150%;
  }

  &.active {
    background: #ff6f4b;

    svg {
      color: #ffefe0;
    }
    h4 {
      color: #ffefe0;
    }
  }
`;

export default Category 