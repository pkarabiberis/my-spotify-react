import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TopArtists } from './TopArtists';
import { Artist } from './Artist';
import { Playlist } from './Playlist';
import { Playlists } from './Playlists';
import { Profile } from './Profile';
import { RecentlyPlayed } from './RecentlyPlayed';
import { TopTracks } from './TopTracks';
import { Track } from './Track';

interface UserProps {}

export const User: React.FC<UserProps> = ({}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route exact path="/artists" component={TopArtists} />
        <Route exact path="/tracks" component={TopTracks} />
        <Route exact path="/recentlyplayed" component={RecentlyPlayed} />
        <Route exact path="/playlists" component={Playlists} />
        <Route exact path="/artist/:artistId" component={Artist} />
        <Route exact path="/track/:trackId" component={Track} />
        <Route exact path="/playlist/:playlistId" component={Playlist} />
      </Switch>
    </Router>
  );
};
