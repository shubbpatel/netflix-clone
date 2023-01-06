import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/netflix.png';

export default function Header(props) {
    const navigate = useNavigate();


  return (
    <Container className='flex a-center j-between' >
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <button onClick={() => navigate(props.login? "/login" : "/signup")}>
            {props.login ? "Log In": "Sign In"}</button>
    </Container>
  )
}

const Container = styled.div`
padding: 0 4rem;
.logo{
    img{
        height:10rem;
    }
}
button{
    padding: 0.5rem 1rem;
    background-color:#E50914;
    border: none;
    cursor:pointer;
    color: white;
    border-radius: .2rem;
    font-size:1.05rem;
}
`;
