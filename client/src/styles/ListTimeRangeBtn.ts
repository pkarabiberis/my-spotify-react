import styled from 'styled-components';
import { TimeRangeProps } from '../types/TimeRange';
import theme from './theme';

const ListTimeRangeBtn = styled.span<TimeRangeProps>`
  display: inline-block;
  color: black;
  font-weight: 700;
  font-size: ${theme.fontSizes.sm};
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  border-color: ${({ active }) =>
    active ? `${theme.colors.red}` : 'transparent'};
  margin: 0px 0px 10px 10px;
  transition: ${theme.transition};
  text-align: center;
  white-space: nowrap;
`;

export default ListTimeRangeBtn;
