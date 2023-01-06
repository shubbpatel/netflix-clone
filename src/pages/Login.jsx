import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Backgroundimage from "../components/Backgroundimage";
import Header from "../components/Header";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../utils/firebase";


export default function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      // const auth = getAuth();
      const { email, password } = formValues;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  // const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate('/');
  }
  });

  return (
    <Container>
      <Backgroundimage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center jcenter">
            <div className="title">
              <h3>Log In</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="enter password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={handleLogin}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    background-color: (0, 0, 0, 1);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh, 85vh;
    .form-container{
      gap: 2rem;
      height: 85vh;
      .form{
        padding:2rem;
        background-color:#000000b0;
        width:25vw;
        gap:2rem;
        color: white;
        .container{
          gap: 2rem;
          input{
            padding: 0.5rem 1rem;
            width: 15rem;
            background-color:#333333;
            border:none;
            border-radius:.2rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-size: 1.05rem;
          }
        }
    }
    }
  }
`;
