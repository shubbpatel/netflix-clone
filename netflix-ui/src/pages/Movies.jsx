import React from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
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


export default function Movies() {
  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

 useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movies" }));
    }
  }, [dispatch, genresLoaded]);

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(auth, (currentUser) => {
    // if (currentUser) {
    //   navigate('/');
  // }
  });


  return (
    <Container>
      <div className="navbar">
        <Navbar 
        isScrolled={isScrolled} 
        />
      </div>
      <div className="data">
        <SelectGenre genres={genres}/>
        {
          movies.length ? <Slider movies={movies}/> : 
          <NotAvailable/>
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
.navbar{
 
  // background-color: black;
} .data{
  margin-top: 8rem;
}

`;
