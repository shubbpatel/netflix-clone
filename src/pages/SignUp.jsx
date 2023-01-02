import React, { useState } from "react";
import styled from "styled-components";
import Backgroundimage from "../components/Backgroundimage";
import Header from "../components/Header";

export default function SignUp() {

const [showPassword, setShowPassword] =useState(false);


  return (
    <Container showPassword={showPassword} >
      <Backgroundimage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV Shows and more</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>
              Ready To Watch? Enter Your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input type="email" placeholder="email Address" name="email" />
            { showPassword && <input
              type="password"
              placeholder="enter password"
              name="password"
            /> }
            
            {
              !showPassword && <button onClick={()=> setShowPassword(true)} >Get Started</button>
            
            }
          </div>
          <button>Sign Up</button>
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
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns:${({showPassword}) => showPassword? "1fr 1fr": "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus{
            outline: none;
          }
        }
        button{
          padding: 0.5rem 1rem;
          background-color:#E50914;
          border: none;
          cursor:pointer;
          color: white;
          font-size:1.05rem;
        }
        
      }
    }button{
      padding: 0.5rem 1rem;
      background-color:#E50914;
      border: none;
      cursor:pointer;
      color: white;
      border-radius: .2rem;
      font-size:1.05rem;
    }
  }
`;
