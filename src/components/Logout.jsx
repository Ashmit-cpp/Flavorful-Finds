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
  border: 1px solid #e94057; /* Accent Red Border */
  color: #e94057;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background: #e94057;
    color: white;
    box-shadow: 0 4px 12px rgba(233, 64, 87, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    border: none;
    background: #ffe4e6;
    margin-top: 1rem;
    
    &:hover {
        background: #e94057;
    }
  }
`;

export default Logout;