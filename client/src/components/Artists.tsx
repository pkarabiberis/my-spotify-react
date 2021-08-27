import { Layout } from './Layout';
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
} from '../spotify';
import { useState } from 'react';
import { Item } from '../types/Artists';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface ArtistsProps {}
export interface TimeRangeProps {
  active: boolean;
}

export type Ranges = 'long' | 'medium' | 'short';

const ArtistsContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  text-align: center;
`;

const ArtistText = styled.span`
  margin-top: 10px;
  text-decoration: none;
  color: black;
`;

const ArtistImage = styled.div`
  img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }
`;

const Header = styled.div`
  margin-top: 80px;
  display: flex;
  div {
    margin-left: auto;
  }
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

const ArtistContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
`;

export const Artists: React.FC<ArtistsProps> = ({}) => {
  const [artists, setArtists] = useState<Item[] | null>();
  const [active, setActive] = useState<Ranges>('short');

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
    const { data } = await rangeCalls[range];
    setArtists(data.items);
    setActive(range);
  };

  return (
    <Layout>
      <Header>
        <div>
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
        </div>
      </Header>
      <ArtistsContainer>
        {artists &&
          artists.map((a) => (
            <ArtistContainer to={`/artist/${a.id}`} key={a.id}>
              <ArtistImage>
                <img src={a.images[0].url} />
              </ArtistImage>
              <ArtistText>{a.name}</ArtistText>
            </ArtistContainer>
          ))}
      </ArtistsContainer>
    </Layout>
  );
};
