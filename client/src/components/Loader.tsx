import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Layout } from './Layout';

interface LoaderProps {}

interface ItemDelay {
  delay: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const CubeGrid = styled.div`
  width: 40px;
  height: 40px;
  margin: 100px auto;
`;

const rotate = keyframes`
    0% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    70% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }

`;

const Item = styled.div<ItemDelay>`
  width: 33%;
  height: 33%;
  background-color: #333;
  float: left;

  animation-name: ${rotate};
  animation-delay: ${(props) => props.delay};
  animation-name: ${rotate};
  animation-duration: 1500ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <Container>
      <CubeGrid>
        <Item delay={'0.2s'} />
        <Item delay={'0.3s'} />
        <Item delay={'0.4s'} />
        <Item delay={'0.1s'} />
        <Item delay={'0.2s'} />
        <Item delay={'0.3s'} />
        <Item delay={'0.0s'} />
        <Item delay={'0.1s'} />
        <Item delay={'0.2s'} />
      </CubeGrid>
    </Container>
  );
};
