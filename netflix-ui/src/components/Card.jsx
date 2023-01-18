import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { async } from "@firebase/util";
import axios from "axios";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { removeFromLikedMovies } from "../store";

export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });
  const dispatch = useDispatch();

  const addToList = async () => {
    try {
      await axios.post("http://localhost:4000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="" />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            {/* <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt=""
              onClick={() => navigate("/player")}
            /> */}
            <video
              src={video}
              onClick={() => navigate("/player")}
              autoPlay
              loop
              muted
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ movieId: movieData.id, email })
                      )
                    } />
                {isLiked ? (
                  <BsCheck
                    title="remove from list"
                    
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="more info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .hover {
    position: absolute;
    z-index: 90;
    height: max-content;
    // max-width: 100px;
    width: max-content;
    // border: 5px solid white;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      box-shadow: rgba(0, 0, 0, 0.78) 0px 3px 10px;
      position: relative;
      height: 144px;
      // img{
      //     width: 100%;
      //     height: 144px;
      //     object-fit: cover;
      //     border-radius: 0.3rem;
      //     top: 0;
      //     z-index:4;
      //     position: absolute;
      // }
      video {
        width: 100%;
        height: 144px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: grey;
        }
        &: ;
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
