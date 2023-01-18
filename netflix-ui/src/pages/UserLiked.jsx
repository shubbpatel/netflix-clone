import React from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import{ useEffect, useState } from "react";
import {auth} from "../utils/firebase";
import {
  onAuthStateChanged,
} from "firebase/auth";
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from './NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Card from '../components/Card';

export default function UserLiked() {
    const navigate = useNavigate();


  
    const movies = useSelector((state) => state.netflix.movies);

  
    const dispatch = useDispatch();

    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {setEmail(currentUser.email);}
      else navigate("/login");
    });
  
   useEffect(() => {
    if(email) {
        dispatch(getUserLikedMovies(email));
    }
}, [email]);
  

  
    const [isScrolled, setIsScrolled] = useState(false);
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  

  return (
    <Container isScrolled={isScrolled}>
        <Navbar/>
        <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
                {movies.map((movie, index)=> {
                    return <Card movieData={movie} index={index} key={movie.id} />
                })}
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
.content{
    margin: 2.3rem;
    margin-top: 5rem;
    gap: 3rem;
    h1{
        margin-left: 2rem;
    }
    .grid{
        flex-wrap: wrap;
        gap:2rem;
    }
}
`;

