import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  max-height: calc(100% - 70px);
  outline: none;
  overflow: hidden;
  margin: 0;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  padding-bottom: 0;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;