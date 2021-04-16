import styled from "styled-components";

export const StyledLoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0;
  position: relative;
`;

export const StyledLoginContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 25px 60px;
  border-radius: 5px;
  border: 2px solid #333;
  min-width: 500px;
  position: absolute;
  top: 50%;
  transform: translateY(-55%);

  & h1 {
    text-align: center;
    margin-bottom: 50px;
    font-size: 24px;
    letter-spacing: 0.3rem;
    color: #C4421A;
  }

  & a {
    text-decoration: none;
    color: teal;
  }
`;

export const StyledFormControl = styled.div`
  position: relative;
  margin: 20px 0 40px;
  width: 100%;
  letter-spacing: 3.5px;

  & label {
    position: absolute;
    top: 15px;
    left: 0;
    font-size: 16px;

    & span {
      display: inline-block;
      font-size: 16px;
      min-width: 5px;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }
`;

export const FormInput = styled.input`
  height: 100%;  
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 10px;
  color: #fff;
  font-family: sans-serif;
  letter-spacing: 3.5px;

    &:focus, :valid {
      outline: 0;
      border-bottom-color: teal;
    }

    &:focus + label span, :valid + label span {
      color: teal;
      transform: translateY(-40px);
    }

    &:-webkit-autofill, -webkit-autofill:hover, -webkit-autofill:focus, -webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      -webkit-text-fill-color: teal !important;
      border-radius: 10px;
      background-color: red;
    }
`;

export const FormButton = styled.button`
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background-color: teal;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    background-color: #005a5a;
  }
`;

export const FormText = styled.p`
  margin-top: 40px;
`;