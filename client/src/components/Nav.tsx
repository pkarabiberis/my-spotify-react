import { BiRewindCircle } from 'react-icons/bi';
import { FaMusic, FaUserAlt } from 'react-icons/fa';
import { GiMicrophone } from 'react-icons/gi';
import { RiPlayListFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
  color: black;
  span {
    margin-top: 5px;
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

const NavItemLink = styled(NavLink)`
  text-decoration: none;
  &:hover,
  &:focus,
  &.active {
    box-shadow: 0 5px rgb(29, 185, 84);
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
