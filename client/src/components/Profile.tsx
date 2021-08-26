import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo, logout } from '../spotify';
import Main from '../styles/Main';
import { Artists } from '../types/Artists';
import { Following } from '../types/Following';
import { Playlists } from '../types/Playlists';
import { Tracks } from '../types/Tracks';
import { User } from '../types/User';
import { Layout } from './Layout';
import { TrackItem } from './TrackItem';

interface ProfileProps {}

const Header = styled.header`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const Username = styled.h1`
  font-size: 50px;
  font-weight: 700;
`;

const UserStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 30px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StatNumber = styled.div`
  color: rgb(29, 185, 84);
  font-weight: 700;
`;

const StatLabel = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.7em;
`;

const TopDataContainer = styled.section`
  display: grid;
  grid-gap: 80px;
  grid-template-columns: 1fr 1fr;
`;

const DataList = styled.div`
  margin-top: 80px;
`;

const TopDataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SeeMoreBtn = styled.button`
  display: inline-block;
  color: rgb(29, 185, 84);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50px;
  cursor: pointer;
  background-color: #d3f9d8;
  padding: 11px 24px;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;
  text-align: center;
  white-space: nowrap;
`;

const Artist = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  span {
    font-size: 1.2rem;
  }
`;

export const Profile: React.FC<ProfileProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);
  const [followedArtists, setFollowedArtists] = useState<Following | null>(
    null
  );
  const [topTracks, setTopTracks] = useState<Tracks | null>(null);
  const [topArtists, setTopArtists] = useState<Artists | null>(null);
  const [playlists, setPlaylists] = useState<Playlists | null>(null);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, topTracks, topArtists, playlists } =
        await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setTopTracks(topTracks);
      setTopArtists(topArtists);
      setPlaylists(playlists);
    };

    history.location.hash && history.replace('/');

    fetchData();
  }, []);

  return (
    <>
      {user ? (
        <Layout>
          <Header>
            <Avatar>
              {user.images.length > 0 ? (
                <img src={user.images[0].url} alt="avatar" />
              ) : null}
            </Avatar>
            <Username>{user.display_name}</Username>
            <UserStats>
              <Stat>
                <StatNumber>{user.followers.total}</StatNumber>
                <StatLabel>Followers</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{followedArtists?.artists.total}</StatNumber>
                <StatLabel>Following</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{playlists?.total}</StatNumber>
                <StatLabel>Playlists</StatLabel>
              </Stat>
            </UserStats>
            <SeeMoreBtn onClick={logout}>Logout</SeeMoreBtn>
          </Header>
          <TopDataContainer>
            <DataList>
              <TopDataHeader>
                <h3>Top tracks</h3>
                <SeeMoreBtn>See more</SeeMoreBtn>
              </TopDataHeader>
              {topTracks &&
                topTracks.items
                  .slice(0, 10)
                  .map((track) => <TrackItem key={track.id} track={track} />)}
            </DataList>
            <DataList>
              <TopDataHeader>
                <h3>Top Artists</h3>
                <SeeMoreBtn>See more</SeeMoreBtn>
              </TopDataHeader>
              {topArtists?.items.slice(0, 10).map((artist) => (
                <Artist key={artist.id}>
                  {artist.images.length > 0 && (
                    <img src={artist.images[2].url} />
                  )}
                  <span>{artist.name}</span>
                </Artist>
              ))}
            </DataList>
          </TopDataContainer>
        </Layout>
      ) : (
        <Layout>Loading...</Layout>
      )}
    </>
  );
};
