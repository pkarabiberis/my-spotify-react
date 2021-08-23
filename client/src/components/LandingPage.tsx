import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './Login';
import { Profile } from './Profile';

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Profile} />
        <Route exact path='/tracks' component={Login} />
      </Switch>
    </Router>
  );
};
