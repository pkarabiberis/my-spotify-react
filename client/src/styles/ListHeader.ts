import styled from 'styled-components';
import { sizes } from './media';

const ListHeader = styled.div`
  margin-top: 80px;
  display: flex;
  div {
    margin-left: auto;
    @media (max-width: ${sizes.tablet}) {
      margin-right: auto;
    }
  }
`;

export default ListHeader;
