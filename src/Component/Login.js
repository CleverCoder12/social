import { signInWithPopup } from "@firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { setLogin } from "../features/User/userSlice";
import { auth, provider } from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const SignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      let app = result.user;
      dispatch(
        setLogin({
          name: app.displayName,
          img: app.photoURL,
          uid: app.uid,
        })
      );
    });
  };
  return (
    <Container>
      <Button onClick={SignIn}>
        <img src="./image/google.png" alt="Google" />
        Sign in with Google
      </Button>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;

  background-color: white;
  display: flex;
  align-items: center;

  img {
    height: 1.5rem;
    object-fit: contain;
    margin-right: 10px;
  }
  font-weight: 700;
  color: rgba(107, 114, 128, 1);
  white-space: 1px;
  cursor: pointer;
`;
