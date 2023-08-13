import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Favbutton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Favourite/');
  };

  return (
    <Btt className="wishlist-Btt" onClick={handleClick}>
      <AiFillHeart />
      Favourites
    </Btt>
  );
}

const Btt = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #ffab40;
  font-size: 1rem;
  color: #292421;
  padding: 1rem 0.8rem;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  margin-right: 1rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #ffca7a;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 171, 64, 0.3);
  }

  &::before {
    content: ""; /* Optional icon here, for example, using Font Awesome */
    display: inline-block;
    margin-right: 0.5rem;
    font-family: "Font Awesome"; /* Replace with the appropriate font */
    font-size: 1.2rem;
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
`;


export default Favbutton;
