import React from 'react';

import { StyledLoginWrapper, StyledLoginContainer, StyledFormControl, FormInput, FormButton } from "./styles/StyledForm";

const Register = () => {

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
        <h1>Register an account</h1>
        <form action="" autoComplete="off">
          <StyledFormControl>
            <FormInput name="username" type="text" required autoComplete="none" onClick={handleFormInput} />
            <label htmlFor="username">Username</label>
          </StyledFormControl>
          <StyledFormControl>
            <FormInput name="email" type="email" required autoComplete="none" onClick={handleFormInput} />
            <label htmlFor="email">Email</label>
          </StyledFormControl>
          <StyledFormControl>
            <FormInput name="password" type="password" autoComplete="none" required onClick={handleFormInput} />
            <label htmlFor="password">Password</label>
          </StyledFormControl>
          <StyledFormControl>
            <FormInput name="confirmPassword" type="password" autoComplete="none" required onClick={handleFormInput} />
            <label htmlFor="confirmPassword">Confirm  Password</label>
          </StyledFormControl>

          <FormButton>Register</FormButton>

        </form>
      </StyledLoginContainer>
    </StyledLoginWrapper>
  );
};

export default Register;

