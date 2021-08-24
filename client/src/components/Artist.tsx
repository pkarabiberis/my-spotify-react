import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getArtist } from '../spotify';
import { Item } from '../types/Artists';
import { Layout } from './Layout';

interface ArtistProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  align-items: center;
`;

const ArtistImage = styled.div`
  img {
    border-radius: 100%;
    width: 300px;
    height: 300px;
  }
`;

const ArtistName = styled.span`
  margin-top: 15px;
  font-size: 2rem;
  font-weight: 700;
`;

export const Artist: React.FC<ArtistProps> = () => {
  const [artist, setArtist] = useState<Item | null>();
  const params: { artistId: string } = useParams();
  useEffect(() => {
    const fetchArtist = async () => {
      const { data } = await getArtist(params.artistId);
      setArtist(data);
    };

    fetchArtist();
  }, []);

  return (
    <Layout>
      {artist ? (
        <Container>
          <ArtistImage>
            <img src={artist?.images[0].url} />
          </ArtistImage>
          <ArtistName>{artist?.name}</ArtistName>
        </Container>
      ) : (
        <Layout>Loading...</Layout>
      )}
    </Layout>
  );
};
