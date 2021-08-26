import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTrack } from '../spotify';
import { Item } from '../types/Tracks';
import { getYear } from '../utils';
import { Layout } from './Layout';

interface TrackProps {}

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
`;

const ArtistArt = styled.div`
  max-width: 250px;
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

const TrackName = styled.h1`
  margin-bottom: 5px;
  margin-top: 0;
  font-size: 2rem;
`;

const TrackArtist = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  color: rgb(117 109 109);
  margin-bottom: 5px;
`;

const TrackAlbum = styled.span`
  color: rgb(117 109 109);
`;

export const Track: React.FC<TrackProps> = ({}) => {
  const [track, setTrack] = useState<Item | null>(null);
  const params: { trackId: string } = useParams();
  console.log(params);
  useEffect(() => {
    const fetchTrack = async () => {
      const { data } = await getTrack(params.trackId);
      setTrack(data);
    };

    fetchTrack();
  }, []);

  return (
    <Layout>
      {track ? (
        <Container>
          <Header>
            <ArtistArt>
              <img src={track?.album.images[0].url} />
            </ArtistArt>
            <TrackInfo>
              <TrackName>{track?.name}</TrackName>
              <TrackArtist>{track?.artists[0].name}</TrackArtist>
              <TrackAlbum>
                {track?.album.name} • {getYear(track?.album.release_date)}
              </TrackAlbum>
            </TrackInfo>
          </Header>
        </Container>
      ) : (
        <Layout>Loading</Layout>
      )}
    </Layout>
  );
};
