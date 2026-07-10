import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';

function Favbutton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Favourite/');
  };

  return (
    <Btt className="wishlist-Btt" onClick={handleClick}>
      <LogoIcon />
      <span className="button-text">Favourites</span>
    </Btt>
  );
}
const LogoIcon = styled(AiOutlineHeart)`
  color: currentColor;
  cursor: pointer;
  margin-right: 4px;
  margin-bottom: 2px;
  font-size: 1.2rem;
`;
const Btt = styled.button`
  min-width: 2rem;
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: inherit;
  padding: .6rem;
  border-radius: 0;
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    color: var(--saffron);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(255, 171, 64, 0.3);
  }

  &::before {
    content: '';
    display: inline-block;
    margin-right: 0.5rem;
    font-family: 'Font Awesome'; /* Replace with the appropriate font */
    font-size: 1.2rem;
    color: #564f48; /* Icon color */
  }

  /* Ripple effect */
  &::after {
    content: '';
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

  @media (max-width: 768px) {
    padding: 0.05rem 0.5rem;
    font-weight: 600;
    .button-text {
      display: none;
    }
    ${LogoIcon} {
      font-size: 3rem;
      display: block;
    }
    &::before {
      font-size: 1rem;
      margin-right: 0.4rem;
    }
  }
`;

export default Favbutton;
