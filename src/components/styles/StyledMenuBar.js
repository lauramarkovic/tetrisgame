import styled from "styled-components";

export const StyledNav = styled.nav`
  background-color: rgba(17, 17, 17, 0.8);
  font-family: 'Pixel', sans-serif;
  font-size: 0.8rem;
  top: 0;
  left: 0;
  right: 0;
`;

export const StyledMenuBarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

export const StyledMenuBarUl = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 7px 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #333;
  }
  
  &.active {
    color: teal;
  }
`;