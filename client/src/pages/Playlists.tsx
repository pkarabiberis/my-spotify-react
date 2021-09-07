import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPlaylists } from '../spotify';
import { Item } from '../types/Playlists';
import { Layout } from '../components/Layout';
import theme from '../styles/theme';
import { sizes } from '../styles/media';

interface PlaylistsProps {}

const PlayListsContainer = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px;
  justify-items: center;

  @media (max-width: ${sizes.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: ${sizes.phablet}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const Playlist = styled(Link)`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  text-align: center;

  &:hover {
    transform: scale(1.03);
  }
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
