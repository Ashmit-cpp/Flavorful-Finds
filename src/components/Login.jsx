import { AuthContext } from '../Firebase/AuthContext';
import styled from 'styled-components';
import React, { useState, useContext, useEffect } from "react";
import { auth, provider, db } from "../Firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa"
import { collection, doc, updateDoc } from 'firebase/firestore';

function Login() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      //adding a new user to firestore when they sign in 
      const addUserToFirestore = async (user) => {
        const usersRef = collection(db, 'user');
        const userDocRef = doc(usersRef, user.email);
        console.log(user.uid);
        try {
          await updateDoc(userDocRef, user);
          console.log('User added/updated in Firestore!');
        } catch (error) {
          console.error('Error adding/updating user in Firestore: ', error);
        }
      }
      const newUser = {
        uid: data.user.uid,
        name: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL
      };
      addUserToFirestore(newUser);

      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("uid", data.user.uid);
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
        <Btt onClick={handleSignIn}>
          <LogoIcon />
          Sign In
        </Btt>
      ) : (
        <Btt onClick={handleSignOut}>Sign Out</Btt>
      )}
    </>
  );
}
const LogoIcon = styled(FaGoogle)`
  color:  #292421;
  cursor: pointer;
  margin-right: 5px;
`;

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
