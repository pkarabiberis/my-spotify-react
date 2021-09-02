import { BiRewindCircle } from 'react-icons/bi';
import { FaMusic, FaUserAlt } from 'react-icons/fa';
import { GiMicrophone } from 'react-icons/gi';
import { RiPlayListFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { sizes } from '../styles/media';
import theme from '../styles/theme';

interface NavProps {}

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 5px;
    font-weight: 500;
  }

  @media (max-width: ${sizes.phablet}) {
    font-size: ${theme.fontSizes.xs};
  }
`;

const NavItemLink = styled(NavLink)`
  text-decoration: none;
  &:hover,
  &:focus,
  &.active {
    box-shadow: 0 5px ${theme.colors.red};
    color: black;
    cursor: pointer;
  }
`;

export const Nav: React.FC<NavProps> = ({}) => {
  return (
    <NavBar>
      <NavItemLink exact to="/">
        <NavItem>
          <FaUserAlt />
          <span>Profile</span>
        </NavItem>
      </NavItemLink>
      <NavItemLink exact to="/artists">
        <NavItem>
          <GiMicrophone />
          <span>Top artists</span>
        </NavItem>
      </NavItemLink>
      <NavItemLink exact to="/tracks">
        <NavItem>
          <FaMusic />
          <span>Top tracks</span>
        </NavItem>
      </NavItemLink>
      <NavItemLink exact to="/recentlyplayed">
        <NavItem>
          <BiRewindCircle />
          <span>Recent</span>
        </NavItem>
      </NavItemLink>
      <NavItemLink exact to="/playlists">
        <NavItem>
          <RiPlayListFill />
          <span>Playlists</span>
        </NavItem>
      </NavItemLink>
    </NavBar>
  );
};
