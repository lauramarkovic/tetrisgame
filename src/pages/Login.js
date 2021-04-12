import React from 'react';

import { StyledLoginWrapper, StyledLoginContainer, StyledFormControl, FormInput, FormButton, FormText } from "./styles/StyledForm";

const Login = () => {

  const handleFormInput = () => {
    const labels = document.querySelectorAll('label');

    labels.forEach(label => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
    });
  };

  return (
    <StyledLoginWrapper>
      <StyledLoginContainer>
        <h1>Log in to your account</h1>
        <form action="" autoComplete="off">
          <StyledFormControl>
            <FormInput name="username" type="text" required autoComplete="none" onClick={handleFormInput} />
            <label htmlFor="username">Username</label>
          </StyledFormControl>
          <StyledFormControl>
            <FormInput name="password" type="password" autoComplete="none" required onClick={handleFormInput} />
            <label htmlFor="password">Password</label>
          </StyledFormControl>

          <FormButton>Login</FormButton>

          <FormText>Don't have an account? <a href="/register">Register</a></FormText>
        </form>
      </StyledLoginContainer>
    </StyledLoginWrapper>
  );
};

export default Login;
