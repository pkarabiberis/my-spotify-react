import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { token } from '../spotify';
import GlobalStyle from '../styles/GlobalStyle';
import { LandingPage } from './LandingPage';
import { Login } from './Login';
import { Profile } from './Profile';

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
`;

export const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <Container>
      <GlobalStyle />
      {accessToken ? <LandingPage /> : <Login />}
    </Container>
  );
};
