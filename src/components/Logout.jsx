import React, { useContext } from "react";
import styled from "styled-components";
import { auth } from "../Firebase/Firebase";
import { AuthContext } from "../Firebase/AuthContext";
import { FiLogOut } from "react-icons/fi"; // Optional: Icon for logout

function Logout() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    auth.signOut();
    logout(); // Updates context, causing App to re-render to Login state
  };

  return (
    <LogoutBtn onClick={handleLogout}>
      <FiLogOut />
      <span>Logout</span>
    </LogoutBtn>
  );
}

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: transparent;
  border: 0;
  color: inherit;
  font-family: var(--sans);
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  padding: 0.6rem;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: var(--saffron);
  }

  @media (max-width: 768px) {
    width: 100%;
    border: none;
    background: transparent;
    margin-top: 1rem;
    
    &:hover {
        color: var(--saffron);
    }
  }
`;

export default Logout;
