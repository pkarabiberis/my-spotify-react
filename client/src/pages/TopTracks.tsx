import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getTopTracksLong,
  getTopTracksMedium,
  getTopTracksShort,
} from '../spotify';
import ListHeader from '../styles/ListHeader';
import ListTimeRangeBtn from '../styles/ListTimeRangeBtn';
import { Ranges } from '../types/TimeRange';
import { Item } from '../types/Tracks';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { TrackItem } from '../components/TrackItem';

interface TopTracksProps {}

const TracksContainer = styled.div`
  margin-top: 30px;
`;

export const TopTracks: React.FC<TopTracksProps> = () => {
  const [tracks, setTracks] = useState<Item[] | null>();
  const [active, setActive] = useState<Ranges>('short');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setActive(range);
    const { data } = await rangeCalls[range];
    setTracks(data.items);
    setLoading(false);
  };

  return (
    <Layout>
      {tracks && tracks.length > 0 ? (
        <>
          <ListHeader>
            <div>
              <ListTimeRangeBtn
                onClick={() => rangeChange('short')}
                active={active === 'short'}
              >
                4 Weeks
              </ListTimeRangeBtn>
              <ListTimeRangeBtn
                onClick={() => rangeChange('medium')}
                active={active === 'medium'}
              >
                6 Months
              </ListTimeRangeBtn>
              <ListTimeRangeBtn
                onClick={() => rangeChange('long')}
                active={active === 'long'}
              >
                All time
              </ListTimeRangeBtn>
            </div>
          </ListHeader>
          {!loading ? (
            <TracksContainer>
              {tracks &&
                tracks.map((track) => (
                  <TrackItem key={track.id} track={track} />
                ))}
            </TracksContainer>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};
