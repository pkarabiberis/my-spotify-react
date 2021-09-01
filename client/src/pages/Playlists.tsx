import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPlaylists } from '../spotify';
import { Item } from '../types/Playlists';
import { Layout } from '../components/Layout';
import theme from '../styles/theme';

interface PlaylistsProps {}

const PlayListsContainer = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
`;

const Playlist = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  color: black;
`;

const PlaylistImg = styled.div`
  max-width: 250px;
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const PlaylistName = styled.h3`
  margin-top: 5px;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
`;

const PlaylistTracks = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  color: rgb(117 109 109);
`;

export const Playlists: React.FC<PlaylistsProps> = ({}) => {
  const [playlists, setPlayLists] = useState<Item[] | null>(null);
  useEffect(() => {
    const fetchPlayLists = async () => {
      const { data } = await getPlaylists();
      setPlayLists(data.items);
    };

    fetchPlayLists();
  }, []);

  console.log('pl: ', playlists);
  return (
    <Layout>
      <PlayListsContainer>
        {playlists &&
          playlists.map((pl) => (
            <Playlist key={pl.id} to={`playlist/${pl.id}`}>
              <PlaylistImg>
                <img src={pl.images[0].url} />
              </PlaylistImg>
              <PlaylistName>{pl.name}</PlaylistName>
              <PlaylistTracks>{pl.tracks.total} TRACKS</PlaylistTracks>
            </Playlist>
          ))}
      </PlayListsContainer>
    </Layout>
  );
};
