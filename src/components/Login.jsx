import React, { useContext } from "react";
import { AuthContext } from "../Firebase/AuthContext";
import styled from "styled-components";
import { auth, provider, db } from "../Firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const { login } = useContext(AuthContext);

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const userRef = doc(db, "user", data.user.email);
      try {
        const docSnapshot = await getDoc(userRef);
        
        const userData = {
          uid: data.user.uid,
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
        };

        if (docSnapshot.exists()) {
          await updateDoc(userRef, userData);
        } else {
          await setDoc(userRef, userData);
        }
      } catch (error) {
        console.error("Error managing user in Firestore: ", error);
      }

      // Store in local storage
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("uid", data.user.uid);
      
      // Update Context
      login();
    });
  };

  return (
    <GoogleBtn onClick={handleSignIn}>
      <FaGoogle />
      <span>Sign in</span>
    </GoogleBtn>
  );
}

const GoogleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
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
  box-shadow: none;

  svg {
    font-size: 1.1rem;
    color: var(--saffron);
  }

  &:hover {
    color: var(--saffron);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export default Login;
