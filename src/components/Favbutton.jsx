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
  border: none;
  background: #ffab40;
  font-size: 1rem;
  color: #292421;
  padding: 1rem 0.8rem;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  margin-right:3rem;
`;

export default Favbutton;
