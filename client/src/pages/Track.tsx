import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { getTrackInfo } from '../spotify';
import { sizes } from '../styles/media';
import theme from '../styles/theme';
import { TrackAnalysis } from '../types/TrackAudioAnalysis';
import { TrackAudioFeatures } from '../types/TrackAudioFeatures';
import { Item } from '../types/Tracks';
import { formatDurationForHumans, getYear, parsePitchClass } from '../utils';

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

  @media (max-width: ${sizes.thone}) {
    margin-bottom: 15px;
  }
`;

const TrackFeatures = styled.div`
  margin-top: 30px;
  display: grid;
  border-top: 1px solid rgb(117 109 109);
  border-left: 1px solid rgb(117 109 109);
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  text-align: center;

  @media (max-width: ${sizes.thone}) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`;

const TrackFeature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  border-right: 1px solid rgb(117 109 109);
  border-bottom: 1px solid rgb(117 109 109);
  h1 {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 5px;
    @media (max-width: ${sizes.thone}) {
      font-size: 24px;
    }
  }
  span {
    color: ${theme.colors.red};
    font-size: ${theme.fontSizes.xs};
    font-weight: 400;
  }
`;

const PlayButton = styled.a`
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
  transition: all 0.2s cubic-bezier(0.3, 0, 0.4, 1);
  text-align: center;
  white-space: nowrap;
  margin-top: auto;
  margin-bottom: 10px;
  align-self: baseline;
  &:hover {
    background-color: ${theme.colors.red};
    color: white;
  }
  @media (max-width: ${sizes.thone}) {
    align-self: center;
  }
`;

export const Track: React.FC<TrackProps> = () => {
  const [track, setTrack] = useState<Item | null>(null);
  const [trackAudioFeatures, setTrackAudioFeatures] =
    useState<TrackAudioFeatures | null>(null);
  const [trackAudioAnalysis, setTrackAudioAnalysis] =
    useState<TrackAnalysis | null>(null);

  const params: { trackId: string } = useParams();
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
                <img src={track?.album.images[0].url} alt="Album" />
              </ArtistArt>
              <TrackInfo>
                <TrackName>{track?.name}</TrackName>
                <TrackArtist>{track?.artists[0].name}</TrackArtist>
                <TrackAlbum>
                  {track?.album.name} • {getYear(track?.album.release_date)}
                </TrackAlbum>
                <PlayButton
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play on Spotify
                </PlayButton>
              </TrackInfo>
            </Header>
            <TrackFeatures>
              <TrackFeature>
                <h1>{formatDurationForHumans(track.duration_ms)}</h1>
                <span>Duration</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{track.popularity}%</h1>
                <span>Popularity</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.track.time_signature}</h1>
                <span>Time signature</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{parsePitchClass(trackAudioAnalysis.track.key)}</h1>
                <span>Key</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{Math.round(trackAudioAnalysis.track.tempo)}</h1>
                <span>Tempo (BPM)</span>
              </TrackFeature>
              <TrackFeature>
                <h1>
                  {trackAudioAnalysis.track.mode === 1 ? 'Major' : 'Minor'}
                </h1>
                <span>Mode</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.bars?.length}</h1>
                <span>Bars</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.segments?.length}</h1>
                <span>Segments</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.sections?.length}</h1>
                <span>Sections</span>
              </TrackFeature>
              <TrackFeature>
                <h1>{trackAudioAnalysis.beats?.length}</h1>
                <span>Beats</span>
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
