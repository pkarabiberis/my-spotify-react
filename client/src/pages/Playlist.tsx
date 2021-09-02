import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlaylist } from '../spotify';
import theme from '../styles/theme';
import { PlaylistRes } from '../types/Playlist';
import { Item } from '../types/Tracks';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { TrackItem } from '../components/TrackItem';
import { sizes } from '../styles/media';

interface PlaylistProps {}

const Container = styled.div`
  margin-top: 80px;
  display: flex;

  @media (max-width: ${sizes.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlaylistGeneralInfo = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
  @media (max-width: ${sizes.tablet}) {
    margin-bottom: 30px;
  }
`;

const PlayListImage = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
  margin-bottom: ${theme.spacing.base};
`;

const PlayListName = styled.h3`
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
`;

const CreatorName = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: rgb(117 109 109);
  font-weight: 400;
`;

const PlaylistDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: rgb(117 109 109);
  font-weight: 400;
`;

const PlaylistTracks = styled.div`
  margin-left: ${theme.spacing.md};
  flex-grow: 1;

  @media (max-width: ${sizes.tablet}) {
    margin: 0;
  }
`;

export const Playlist: React.FC<PlaylistProps> = ({}) => {
  const [playlist, setPlaylist] = useState<PlaylistRes | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Item[] | null>(null);
  const params: { playlistId: string } = useParams();
  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data } = await getPlaylist(params.playlistId);
      console.log('playlistData:', data);
      const tracks = data.tracks.items?.map((item: any) => item.track);
      setPlaylistTracks(tracks);
      setPlaylist(data);
    };

    fetchPlaylist();
  }, [params.playlistId]);

  console.log('playlist: ', playlist);
  console.log('playlist tracks: ', playlistTracks);

  return (
    <Layout>
      {playlist ? (
        <>
          <Container>
            <PlaylistGeneralInfo>
              <PlayListImage>
                {playlist.images?.length && (
                  <img src={playlist.images[0].url} />
                )}
              </PlayListImage>
              <PlayListName>{playlist.name}</PlayListName>
              <CreatorName>Owned by {playlist.owner.display_name}</CreatorName>
              <PlaylistDescription>{playlist.description}</PlaylistDescription>
            </PlaylistGeneralInfo>
            <PlaylistTracks>
              {playlistTracks?.length &&
                playlistTracks.map((track) => (
                  <TrackItem key={track.id} track={track} />
                ))}
            </PlaylistTracks>
          </Container>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};
