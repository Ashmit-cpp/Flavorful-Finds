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
      <span>Sign in with Google</span>
    </GoogleBtn>
  );
}

const GoogleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: white;
  border: 1px solid #e7e5e4; /* stone-200 */
  color: #313131;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem; /* Pill shape */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  min-width: 160px;

  svg {
    font-size: 1.1rem;
    color: #DB4437; /* Google Red brand color */
  }

  &:hover {
    background-color: #fcfcfc;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: #d6d3d1;
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