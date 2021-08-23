import Main from '../styles/Main';
import { Nav } from './Nav';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Main>
      <Nav />
      {children}
    </Main>
  );
};
