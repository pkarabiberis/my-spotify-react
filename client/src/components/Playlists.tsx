import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { getPlaylists } from '../spotify';
import { Item } from '../types/Playlists';
import { Layout } from './Layout';

interface PlaylistsProps {}

const PlayListsContainer = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
`;

const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const PlaylistImg = styled.div`
  max-width: 250px;
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const PlaylistName = styled.h3``;

const PlaylistTracks = styled.span``;

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
            <>
              <Playlist>
                <PlaylistImg key={pl.id}>
                  <img src={pl.images[0].url} />
                </PlaylistImg>
                <PlaylistName>{pl.name}</PlaylistName>
                <PlaylistTracks>{pl.tracks.total} TRACKS</PlaylistTracks>
              </Playlist>
            </>
          ))}
      </PlayListsContainer>
    </Layout>
  );
};
