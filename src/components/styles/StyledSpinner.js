import styled from "styled-components";

export const SpinnerOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #C4421A;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s ease-in-out infinite;
  -webkit-animation: spin 0.6s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @webkit-keyframes spin {
    -webkit-transform: rotate(360deg);
  }
`;