import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Artist } from './Artist';
import { Artists } from './Artists';
import { Login } from './Login';
import { Playlists } from './Playlists';
import { Profile } from './Profile';
import { RecentlyPlayed } from './RecentlyPlayed';
import { TopTracks } from './TopTracks';

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Profile} />
        <Route exact path='/artists' component={Artists} />
        <Route exact path='/tracks' component={TopTracks} />
        <Route exact path='/recentlyplayed' component={RecentlyPlayed} />
        <Route exact path='/playlists' component={Playlists} />
        <Route exact path='/artist/:artistId' component={Artist} />
      </Switch>
    </Router>
  );
};
