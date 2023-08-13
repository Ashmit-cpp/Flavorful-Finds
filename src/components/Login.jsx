import { AuthContext } from "../Firebase/AuthContext";
import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { auth, provider, db } from "../Firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const userRef = doc(db, "user", data.user.email);
      try {
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          // Update existing document
          await updateDoc(userRef, {
            uid: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          });
          console.log("User updated in Firestore!");
        } else {
          // Create new document
          await setDoc(userRef, {
            uid: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          });
          console.log("New user added to Firestore!");
        }
      } catch (error) {
        console.error("Error adding/updating user in Firestore: ", error);
      }

      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("uid", data.user.uid);
      login();
    });
  };

  return (
    <>
      {!isLoggedIn && (
        <Btt onClick={handleSignIn}>
          <LogoIcon />
          Sign In
        </Btt>
      )}
    </>
  );
}
const LogoIcon = styled(FaGoogle)`
  color: #292421;
  cursor: pointer;
  margin-right: 5px;
`;

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

export default Login;
