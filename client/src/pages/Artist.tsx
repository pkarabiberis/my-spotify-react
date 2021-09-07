import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getArtist } from '../spotify';
import theme from '../styles/theme';
import { Item } from '../types/Artists';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

interface ArtistProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  align-items: center;
`;

const ArtistImage = styled.div`
  width: 300px;
  height: 300px;
  img {
    border-radius: 100%;
  }
`;

const ArtistName = styled.h1`
  margin-top: 15px;
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
`;

const ArtistInfoContainer = styled.div`
  margin-top: 15px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
`;

const Info = styled.div`
  p {
    text-transform: uppercase;
    font-size: ${theme.fontSizes.xs};
  }
  span {
    text-align: center;
    font-weight: 700;
    display: block;
  }
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
      <>
        {artist ? (
          <Container>
            <ArtistImage>
              <img src={artist?.images[0].url} />
            </ArtistImage>
            <ArtistName>{artist?.name}</ArtistName>
            <ArtistInfoContainer>
              <Info>
                <p>Genres</p>
                {artist.genres.map((genre, i) => (
                  <span key={i}>{genre}</span>
                ))}
              </Info>
              <Info>
                <p>Popularity</p>
                <span>{artist.popularity}%</span>
              </Info>
              <Info>
                <p>Followers</p>
                <span>{artist.followers.total}</span>
              </Info>
            </ArtistInfoContainer>
          </Container>
        ) : (
          <Loader />
        )}
      </>
    </Layout>
  );
};
