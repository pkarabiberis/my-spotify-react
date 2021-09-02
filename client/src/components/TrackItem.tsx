import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sizes } from '../styles/media';
import theme from '../styles/theme';
import { Track } from '../types/Playlist';
import { Item } from '../types/Tracks';
import { formatDurationForHumans } from '../utils';

interface TrackItemProps {
  track: Item;
}

const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 30px;
  text-decoration: none;
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

const TrackData = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const TrackDataLeftSection = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;

const TrackAlbumArtist = styled.div`
  color: rgb(117 109 109);
  margin-right: 5px;
  font-size: ${theme.fontSizes.sm};
  margin-right: 5px;
  font-weight: 400;
  overflow: inherit;
  text-overflow: inherit;
  white-space: inherit;
  span {
    margin-right: 2px;
  }
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  font-weight: 500;
`;

const TrackDuration = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: rgb(117 109 109);
  align-self: center;
`;

export const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  return (
    <>
      <TrackContainer to={`/track/${track.id}`}>
        <img src={track.album.images[2].url} />
        <TrackData>
          <TrackDataLeftSection>
            <TrackName>{track.name}</TrackName>
            <TrackAlbumArtist>
              <span>
                {track.album.artists.length > 0 && track.album.artists[0].name}{' '}
                •
              </span>

              <span>{track.album.name}</span>
            </TrackAlbumArtist>
          </TrackDataLeftSection>

          <TrackDuration>
            {formatDurationForHumans(track.duration_ms)}
          </TrackDuration>
        </TrackData>
      </TrackContainer>
    </>
  );
};
