import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import axios from "axios";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginFormContainer = styled.div`
  background-color: #fff;
  padding: 2em;
  padding-bottom: 3em;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);

  h1 {
    font-weight: 700;
    color: #384047;
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 1.2em;
    margin-top: 0.2em;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  color: #384047;
  background-color: #e8eeef;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  border: none;
  border-radius: 4px;
  padding: 1em;
  margin-bottom: 1.2em;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-weight: 600;
  text-align: center;
  font-size: 19px;
  color: #fff;
  background-color: #4bc970;
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 0.8em;
  margin-top: 1em;
  margin-bottom: 1em;
  cursor: pointer;
  overflow: hidden;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-4px);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const SignupMessage = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  color: #384047;
  margin-bottom: 1em;

  a {
    text-decoration: none;
    color: #55b6d0;
    transition: color 0.3s;

    &:hover {
      color: #4bc970;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(""); // Clear any previous errors

      // Make the API request
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email,
          password,
        }
      );

      const { username, email: responseEmail, token } = response.data;

      // Dispatch the login action
      dispatch(login({ username, email: responseEmail, token }));

      // Clear the form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <CenteredContainer>
      <LoginFormContainer>
        <h1>Sign in</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <FormContent>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" onClick={handleSubmit}>
            Log in
          </Button>
        </FormContent>
        <SignupMessage>
          <a href="#">Forgot your password?</a>
        </SignupMessage>
      </LoginFormContainer>
    </CenteredContainer>
  );
};

export default Login;
