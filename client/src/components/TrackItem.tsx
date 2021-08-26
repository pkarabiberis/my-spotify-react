import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
`;

const TrackData = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const TrackDataLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TrackAlbumArtist = styled.div`
  display: flex;
  span {
    color: rgb(117 109 109);
    margin-right: 5px;
    font-size: 0.9rem;
  }
`;

const TrackName = styled.span`
  font-size: 1.2rem;
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  color: black;
`;

const TrackDuration = styled.span`
  font-size: 0.9rem;
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
