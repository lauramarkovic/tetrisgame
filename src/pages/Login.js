import React, { useContext, useState } from 'react';
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import Spinner from "../components/Spinner";

import { AuthContext } from "../context/auth";
import { useForm } from "../hooks/useForm";
import { StyledLoginWrapper, StyledLoginContainer, StyledFormControl, FormInput, FormButton, FormText } from "./styles/StyledForm";
import { StyledErrors } from "./styles/StyledErrors";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  };

  const handleFormInput = () => {
    const labels = document.querySelectorAll('label');

    labels.forEach(label => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
    });
  };

  if (loading) return <Spinner />;

  return (
    <StyledLoginWrapper>
      <StyledLoginContainer>
        <h1>Log in to your account</h1>
        {Object.keys(errors).length > 0 && (
          <StyledErrors>
            <ul>
              {Object.values(errors).map(value =>
                <li key={value}>{value}</li>)}
            </ul>
          </StyledErrors>
        )}
        <form onSubmit={onSubmit} autoComplete="off" noValidate>
          <StyledFormControl>
            <FormInput
              name="username"
              value={values.username}
              type="text"
              required
              autoComplete="none"
              onClick={handleFormInput}
              onChange={onChange}
              error={errors.username ? true : false}
            />
            <label htmlFor="username">Username</label>
          </StyledFormControl>
          <StyledFormControl>
            <FormInput
              name="password"
              value={values.password}
              type="password"
              autoComplete="none"
              required
              onClick={handleFormInput}
              onChange={onChange}
              error={errors.password ? true : false}
            />
            <label htmlFor="password">Password</label>
          </StyledFormControl>

          <FormButton type="submit">Login</FormButton>

          <FormText>Don't have an account? <a href="/register">Register</a></FormText>
        </form>
      </StyledLoginContainer>
    </StyledLoginWrapper>
  );
};

const LOGIN_USER = gql`
      mutation login(
        $username: String!
        $password: String!
  ) {
        login(username: $username password: $password) {
        id username token email createdAt
    }
  }
`;

export default Login;
