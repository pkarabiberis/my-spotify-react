import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import { Welcome } from '../components/icons/Welcome';
interface LoginProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ArtWork = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  svg {
    width: auto;
    height: auto;
    max-width: 100%;
  }
`;

const ForeGround = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppText = styled.h1`
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  margin-bottom: 30px;
`;

const LoginButton = styled.a`
  display: inline-block;
  color: ${theme.colors.red};
  font-weight: 700;
  font-size: ${theme.fontSizes.xs};
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid ${theme.colors.red};
  border-radius: 50px;
  cursor: pointer;
  background-color: transparent;
  padding: 11px 24px;
  transition: all 0.2s cubic-bezier(0.3, 0, 0.4, 1);
  text-align: center;
  white-space: nowrap;
  &:hover {
    background-color: ${theme.colors.red};
    color: white;
  }
`;

export const Login: React.FC<LoginProps> = () => {
  return (
    <Container>
      <ArtWork>
        <Welcome />
      </ArtWork>
      <ForeGround>
        <AppText>My Spotify</AppText>
        <LoginButton
          href={
            process.env.NODE_ENV !== 'production'
              ? 'http://localhost:8888/login'
              : 'https://myspotify.karabiberisapps.com/login'
          }
        >
          Log in
        </LoginButton>
      </ForeGround>
    </Container>
  );
};
