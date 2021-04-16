import React, { useContext, useState } from 'react';
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import Spinner from "../components/Spinner";

import { AuthContext } from "../context/auth";
import { useForm } from "../hooks/useForm";
import { StyledLoginWrapper, StyledLoginContainer, StyledFormControl, FormInput, FormButton } from "./styles/StyledForm";
import { StyledErrors } from "./styles/StyledErrors";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
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

  if (loading) return <Spinner />

  return (
    <StyledLoginWrapper>
      <StyledLoginContainer>
        <h1>Register an account</h1>
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
              name="email"
              value={values.email}
              type="email"
              required
              autoComplete="none"
              onClick={handleFormInput}
              onChange={onChange}
              error={errors.email ? true : false}
            />
            <label htmlFor="email">Email</label>
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
          <StyledFormControl>
            <FormInput
              name="confirmPassword"
              value={values.confirmPassword}
              type="password"
              autoComplete="none"
              required
              onClick={handleFormInput}
              onChange={onChange}
              error={errors.confirmPassword ? true : false}
            />
            <label htmlFor="confirmPassword">Confirm  Password</label>
          </StyledFormControl>

          <FormButton type="submit">Register</FormButton>

        </form>
      </StyledLoginContainer>
    </StyledLoginWrapper>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username 
        email: $email 
        password: $password 
        confirmPassword: $confirmPassword
      }
    ) {
      id username token email createdAt
    }
  }
`;

export default Register;

