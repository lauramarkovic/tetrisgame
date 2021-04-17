import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import PlaySound from "./Sound";
import { StyledNav, StyledMenuBarContainer, StyledMenuBarUl, StyledLink } from "./styles/StyledMenuBar";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState('home');

  // const path = window.location.pathname;
  // const myPath = path.slice(1);
  // console.log(myPath);

  const handleItemClick = (e) => setActiveItem(e.target.name);

  const menuBar = user ? (
    <StyledNav>
      <StyledMenuBarContainer>
        <h1>
          <StyledLink
            name="home"
            className={activeItem === 'home' ? 'active' : ''}
            onClick={handleItemClick} as={Link} to="/">
            {user.username}
          </StyledLink>
        </h1>
        <StyledMenuBarUl>
          <PlaySound />
          <li>
            <StyledLink
              name="leaderboard"
              className={activeItem === 'leaderboard' ? 'active' : ''}
              onClick={handleItemClick} as={Link} to="/leaderboard">
              Leaderboard
          </StyledLink>
          </li>
          <li>
            <StyledLink
              name="myscores"
              className={activeItem === 'myscores' ? 'active' : ''} onClick={handleItemClick} as={Link} to="/myscores">
              My scores
          </StyledLink>
          </li>
          <li>
            <StyledLink
              name="logout"
              onClick={logout}
            >
              Log Out
          </StyledLink>
          </li>
        </StyledMenuBarUl>
      </StyledMenuBarContainer>
    </StyledNav>
  ) : (
      <StyledNav>
        <StyledMenuBarContainer>
          <h1>
            <StyledLink
              name="home"
              className={activeItem === 'home' ? 'active' : ''}
              onClick={handleItemClick} as={Link} to="/">
              Home
        </StyledLink>
          </h1>
          <StyledMenuBarUl>
            <PlaySound />
            <li>
              <StyledLink
                name="leaderboard"
                className={activeItem === 'leaderboard' ? 'active' : ''}
                onClick={handleItemClick} as={Link} to="/leaderboard">
                Leaderboard
          </StyledLink>
            </li>
            <li>
              <StyledLink
                name="login"
                className={activeItem === 'login' ? 'active' : ''} onClick={handleItemClick} as={Link} to="/login">
                Log In
          </StyledLink>
            </li>
            <li>
              <StyledLink
                name="register"
                className={activeItem === 'register' ? 'active' : ''} onClick={handleItemClick} as={Link} to="/register">
                Register
          </StyledLink>
            </li>
          </StyledMenuBarUl>
        </StyledMenuBarContainer>
      </StyledNav>
    )

  return menuBar;
};

export default MenuBar;