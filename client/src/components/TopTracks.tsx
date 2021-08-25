import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import {
  getTopTracksLong,
  getTopTracksMedium,
  getTopTracksShort,
} from '../spotify';
import { Item } from '../types/Tracks';
import { Ranges, TimeRangeProps } from './Artists';
import { Layout } from './Layout';
import { TrackItem } from './TrackItem';

interface TopTracksProps {}

const Header = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
`;

const TimeRangeBtn = styled.button<TimeRangeProps>`
  display: inline-block;
  color: rgb(29, 185, 84);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#d3f9d8' : '#fff')};
  padding: 11px 24px;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;
  text-align: center;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  flex-direction: row;
  margin-left: auto;
`;

const TracksContainer = styled.div`
  margin-top: 30px;
`;

export const TopTracks: React.FC<TopTracksProps> = ({}) => {
  const [tracks, setTracks] = useState<Item[] | null>();
  const [active, setActive] = useState<Ranges>('short');

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await getTopTracksShort();
      setTracks(data.items);
    };

    fetchTracks();
  }, []);

  const rangeCalls = {
    short: getTopTracksShort(),
    medium: getTopTracksMedium(),
    long: getTopTracksLong(),
  };

  const rangeChange = async (range: Ranges) => {
    const { data } = await rangeCalls[range];
    setTracks(data.items);
    setActive(range);
  };

  return (
    <Layout>
      <Header>
        <ButtonContainer>
          <TimeRangeBtn
            onClick={() => rangeChange('short')}
            active={active === 'short'}
          >
            4 Weeks
          </TimeRangeBtn>
          <TimeRangeBtn
            onClick={() => rangeChange('medium')}
            active={active === 'medium'}
          >
            6 Months
          </TimeRangeBtn>
          <TimeRangeBtn
            onClick={() => rangeChange('long')}
            active={active === 'long'}
          >
            All time
          </TimeRangeBtn>
        </ButtonContainer>
        <TracksContainer>
          {tracks &&
            tracks.map((track) => <TrackItem key={track.id} track={track} />)}
        </TracksContainer>
      </Header>
    </Layout>
  );
};
