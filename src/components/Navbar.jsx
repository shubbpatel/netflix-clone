import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/netflix.png";
import { Link } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import {auth} from "../utils/firebase"
import {signOut } from "firebase/auth";



export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/" },
    { name: "Movies", link: "/" },
    { name: "My List", link: "/" },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="flex left a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="flex links">
            {links.map(({name, link}) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => setShowSearch(false) && setInputHover(false)}
            />
          </div>
          <button onClick={() => signOut(auth)} >
            <FaPowerOff/>
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div``;
