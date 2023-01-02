import React from 'react';
import background from '../assets/netflix.jpg'; 
import styled from 'styled-components';


export default function BackgroundImage() {
  return (
    <Container>
<img src={background} alt="background" />    
</Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
opacity: 30%;
img{
    height:100vh;
    width: 100vw; 
}
`;
