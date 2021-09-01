import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo, logout } from '../spotify';
import ListTimeRangeBtn from '../styles/ListTimeRangeBtn';
import theme from '../styles/theme';
import { Artists } from '../types/Artists';
import { Following } from '../types/Following';
import { Playlists } from '../types/Playlists';
import { Tracks } from '../types/Tracks';
import { User } from '../types/User';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { TrackItem } from '../components/TrackItem';

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
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  margin-top: 20px;
`;

const UserStats = styled.div`
  margin-top: 20px;
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
  color: ${theme.colors.red};
  font-weight: 700;
`;

const StatLabel = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: ${theme.fontSizes.xs};
  margin-top: ${theme.spacing.xs};
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
  h3 {
    font-size: ${theme.fontSizes.base};
  }
`;

const MainButton = styled.button`
  display: inline-block;
  color: ${theme.colors.red};
  font-weight: 700;
  font-size: ${theme.fontSizes.xs};
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid ${theme.colors.red};
  border-radius: 50px;
  cursor: pointer;
  background-color: transparent;
  padding: 11px 24px;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;
  text-align: center;
  white-space: nowrap;
`;

const Artist = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 30px;
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

const ArtistData = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtistName = styled.span`
  font-weight: 500;
  margin-bottom: 5px;
`;

const ArtistMainGenre = styled.span`
  font-weight: 400;
  font-size: ${theme.fontSizes.sm};
  color: rgb(117 109 109);
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
  }, [history]);

  console.log('userdata: ', topArtists);

  return (
    <Layout>
      {user ? (
        <>
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
            <MainButton onClick={logout}>Logout</MainButton>
          </Header>
          <TopDataContainer>
            <DataList>
              <TopDataHeader>
                <h3>Top tracks of all time</h3>
                <MainButton>See more</MainButton>
              </TopDataHeader>
              {topTracks &&
                topTracks.items
                  .slice(0, 10)
                  .map((track) => <TrackItem key={track.id} track={track} />)}
            </DataList>
            <DataList>
              <TopDataHeader>
                <h3>Top Artists of all time</h3>
                <MainButton>See more</MainButton>
              </TopDataHeader>
              {topArtists?.items.slice(0, 10).map((artist) => (
                <Artist to={`/artist/${artist.id}`} key={artist.id}>
                  {artist.images.length > 0 && (
                    <img src={artist.images[2].url} />
                  )}
                  <ArtistData>
                    <ArtistName>{artist.name}</ArtistName>
                    <ArtistMainGenre>{artist.genres[0]}</ArtistMainGenre>
                  </ArtistData>
                </Artist>
              ))}
            </DataList>
          </TopDataContainer>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};
