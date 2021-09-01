import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTrack } from '../spotify';
import theme from '../styles/theme';
import { Item } from '../types/Tracks';
import { getYear } from '../utils';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

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
  font-size: ${theme.fontSizes.lg};
`;

const TrackArtist = styled.h2`
  font-weight: 500;
  font-size: ${theme.fontSizes.base};
`;

const TrackAlbum = styled.h3`
  color: rgb(117 109 109);
  font-weight: 400;
  font-size: ${theme.fontSizes.sm};
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
  }, [params.trackId]);

  return (
    <Layout>
      <>
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
          <Loader />
        )}
      </>
    </Layout>
  );
};
