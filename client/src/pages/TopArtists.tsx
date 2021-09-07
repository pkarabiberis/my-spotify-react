import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import {
  getTopArtistsLong,
  getTopArtistsMedium,
  getTopArtistsShort,
} from '../spotify';
import ListHeader from '../styles/ListHeader';
import ListTimeRangeBtn from '../styles/ListTimeRangeBtn';
import { Item } from '../types/Artists';
import { Ranges } from '../types/TimeRange';

interface TopArtistsProps {}

const ArtistsContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  text-align: center;
`;

const ArtistText = styled.span`
  margin-top: 10px;
  font-weight: 500;
`;

const ArtistImage = styled.div`
  img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }
`;

const ArtistContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  &:hover {
    transform: scale(1.03);
  }
`;

export const TopArtists: React.FC<TopArtistsProps> = () => {
  const [artists, setArtists] = useState<Item[] | null>();
  const [active, setActive] = useState<Ranges>('short');
  const [loading, setLoading] = useState(false);

  const rangeCalls = {
    short: getTopArtistsShort(),
    medium: getTopArtistsMedium(),
    long: getTopArtistsLong(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtistsShort();
      setArtists(data.items);
    };

    fetchData();
  }, []);

  const rangeChange = async (range: Ranges) => {
    setLoading(true);
    setActive(range);
    const { data } = await rangeCalls[range];
    setArtists(data.items);
    setLoading(false);
  };

  return (
    <Layout>
      {artists && artists.length > 0 ? (
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
            <ArtistsContainer>
              {artists.map((a) => (
                <ArtistContainer to={`/artist/${a.id}`} key={a.id}>
                  <ArtistImage>
                    <img src={a.images[0].url} alt="Artist" />
                  </ArtistImage>
                  <ArtistText>{a.name}</ArtistText>
                </ArtistContainer>
              ))}
            </ArtistsContainer>
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
