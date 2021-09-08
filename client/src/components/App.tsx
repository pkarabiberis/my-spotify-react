import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../pages/User';
import { token } from '../spotify';
import GlobalStyle from '../styles/GlobalStyle';
import { Login } from '../pages/Login';

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
`;

export const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    setAccessToken(token);
  }, []);
  console.log(process.env.NODE_ENV);

  return (
    <Container>
      <GlobalStyle />
      {accessToken ? <User /> : <Login />}
    </Container>
  );
};
