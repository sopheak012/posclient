import React from "react";
import styled from "styled-components";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
`;

const StartButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #4bc970;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 24px;
  cursor: pointer;
`;

const HomePage = ({ onStartButtonClick }) => {
  return (
    <WelcomeContainer>
      <Title>Welcome to Pizza POS System</Title>
      <Description>
        Manage your pizza orders, track inventory, and streamline your pizza
        business with our powerful POS system.
      </Description>
      <StartButton onClick={onStartButtonClick}>Get Started</StartButton>
    </WelcomeContainer>
  );
};

export default HomePage;
