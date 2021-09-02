import styled from 'styled-components';
import { sizes } from './media';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 80px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${sizes.desktop}) {
    padding: 60px 50px;
  }

  @media (max-width: ${sizes.tablet}) {
    padding: 50px 40px;
  }

  @media (max-width: ${sizes.phablet}) {
    padding: 30px 25px;
  }

  @media (max-width: ${sizes.thone}) {
    padding: 15px 10px;
  }

  h1 {
    @media (max-width: ${sizes.tablet}) {
      text-align: center;
    }
  }
`;

export default Main;
