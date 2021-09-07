import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { getRecentlyPlayed } from '../spotify';
import { Item } from '../types/Tracks';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { TrackItem } from '../components/TrackItem';

interface RecentlyPlayedProps {}

const TracksContainer = styled.div`
  margin-top: 80px;
`;

export const RecentlyPlayed: React.FC<RecentlyPlayedProps> = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<Item[] | null>(null);
  useEffect(() => {
    const getRecentlyPlayedTracks = async () => {
      const { data } = await getRecentlyPlayed();
      const tracks = data.items.map((i: any) => i.track);
      setRecentlyPlayed(tracks);
    };

    getRecentlyPlayedTracks();
  }, []);

  return (
    <Layout>
      <>
        {recentlyPlayed ? (
          <TracksContainer>
            {recentlyPlayed &&
              recentlyPlayed.length > 0 &&
              recentlyPlayed.map((rp, i) => <TrackItem key={i} track={rp} />)}
          </TracksContainer>
        ) : (
          <Loader />
        )}
      </>
    </Layout>
  );
};
