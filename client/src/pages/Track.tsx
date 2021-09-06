import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getTrack, getTrackInfo } from '../spotify';
import theme from '../styles/theme';
import { Item } from '../types/Tracks';
import { getYear } from '../utils';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { sizes } from '../styles/media';
import { TrackAudioFeatures } from '../types/TrackAudioFeatures';
import { TrackAnalysis } from '../types/TrackAudioAnalysis';

interface TrackProps {}

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;

  @media (max-width: ${sizes.thone}) {
    flex-direction: inherit;
    align-items: center;
  }
`;

const ArtistArt = styled.div`
  max-width: 250px;
  margin-bottom: 10px;
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

  @media (max-width: ${sizes.thone}) {
    align-items: center;
    margin: 0;
  }
`;

const TrackName = styled.h1`
  font-size: 32px;
  text-align: start !important;
  @media (max-width: ${sizes.thone}) {
    text-align: center !important;
  }
`;

const TrackArtist = styled.h2`
  font-weight: 500;
  font-size: ${theme.fontSizes.base};

  @media (max-width: ${sizes.tablet}) {
    font-size: ${theme.fontSizes.sm};
  }
`;

const TrackAlbum = styled.h3`
  color: rgb(117 109 109);
  font-weight: 400;
  font-size: ${theme.fontSizes.sm};
  @media (max-width: ${sizes.tablet}) {
    font-size: ${theme.fontSizes.xs};
  }
`;

const TrackFeatures = styled.div`
  margin-top: 30px;
  display: grid;
  border-top: 1px solid rgb(117 109 109);
  border-left: 1px solid rgb(117 109 109);
  grid-template-columns: repeat(5, 1fr);
`;

const TrackFeature = styled.div`
  padding: 15px;
  border-right: 1px solid rgb(117 109 109);
  border-bottom: 1px solid rgb(117 109 109);
  text-align: center;
  h1 {
    font-size: 32px;
    font-weight: 500;
    margin: 0;
  }
  span {
    color: ${theme.colors.red};
    font-size: ${theme.fontSizes.xs};
    font-weight: 400;
  }
`;

export const Track: React.FC<TrackProps> = ({}) => {
  const [track, setTrack] = useState<Item | null>(null);
  const [trackAudioFeatures, setTrackAudioFeatures] =
    useState<TrackAudioFeatures | null>(null);
  const [trackAudioAnalysis, setTrackAudioAnalysis] =
    useState<TrackAnalysis | null>(null);

  const params: { trackId: string } = useParams();
  console.log(params);
  useEffect(() => {
    const fetchTrack = async () => {
      const data = await getTrackInfo(params.trackId);
      setTrack(data.track);
      setTrackAudioFeatures(data.audioFeatures);
      setTrackAudioAnalysis(data.audioAnalysis);
    };

    fetchTrack();
  }, [params.trackId]);

  return (
    <Layout>
      <>
        {track && trackAudioFeatures && trackAudioAnalysis ? (
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
            <TrackFeatures>
              <TrackFeature>
                <h1>{trackAudioAnalysis.track.time_signature}</h1>
                <span>Time signature</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.track.key}</h1>
                <span>Key</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.track.tempo}</h1>
                <span>Tempo</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.track.mode}</h1>
                <span>Mode</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.bars?.length}</h1>
                <span>Bars</span>
              </TrackFeature>
            </TrackFeatures>
          </Container>
        ) : (
          <Loader />
        )}
      </>
    </Layout>
  );
};
