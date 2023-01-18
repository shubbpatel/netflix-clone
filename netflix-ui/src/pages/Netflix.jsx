import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/movie.jpg";
import MoviesLogo from "../assets/netflix.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
// import Player from "../components/Player";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import video from '../assets/video.mp4';

export default function Netflix() {
  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [dispatch, genresLoaded]);

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  console.log(movies);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        {/* <img
          src={BackgroundImage}
          alt="Background"
          className="background-image"
        /> */}
        <video src={video} autoPlay loop muted  className="background-image"></video>
        <div className="container">
          <div className="logo">
            <img src={MoviesLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex a-center j-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex a-center j-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}
const Container = styled.div`
background-color: black;
// position: absolute;
z-index: -1;
.hero{
  // z-index: 90;
  // position: relative;
  // top:0;
  .background-image{
    // filter: brightness(%);
    width: 100%;
  }
  img{
    height: 100vh;
    width: 100vw;
  }
  .container{
    position: absolute;
    bottom: 5rem;
    .logo{
      img{
        width: 100%;
        height: 100%;
        margin-left: 5rem;
      }
    } 
    .buttons {
      margin-left: 5rem;
      gap: 2rem;
      button {
        background-color: white;
        font-size: 1.5rem
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover{
          opacity: 0.8;
          color: grey;
        }
        &:nth-of-type(2){
          background-color: rgba(109,109,110,0.7)
          color: red;
          svg{
            font-size: 1.8rem;
          }
        }
      }
    } 
  }
}
`;
