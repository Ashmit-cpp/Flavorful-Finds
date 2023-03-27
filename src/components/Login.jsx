import { AuthContext } from '../Firebase/AuthContext';
import styled from 'styled-components';
import React, { useCallback, useState, useContext, useEffect } from "react";
import { auth, provider } from "../Firebase/Firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      console.log(data.user.email);
      login();
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email "));
  });

  const handleSignOut = () => {
    localStorage.clear()
    window.location.reload()
  };
 

  return (
    <>
      {!isLoggedIn ? (
        <Btt onClick={handleSignIn}>Login/Register</Btt>
      ) : (
        <Btt onClick={handleSignOut}>Sign out</Btt>
      )}
    </>
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
`;

export default Login;
