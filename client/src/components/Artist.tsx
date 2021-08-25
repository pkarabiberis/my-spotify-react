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

const ArtistInfoContainer = styled.div`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Genres = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-transform: uppercase;
    font-size: 0.9rem;
    text-align: center;
  }
  span {
    text-align: center;
  }
`;

const Followers = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-transform: uppercase;
    font-size: 0.9rem;
  }
  span {
    text-align: center;
  }
`;

const Popularity = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-transform: uppercase;
    font-size: 0.9rem;
  }
  span {
    text-align: center;
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

  console.log(artist);

  return (
    <Layout>
      {artist ? (
        <Container>
          <ArtistImage>
            <img src={artist?.images[0].url} />
          </ArtistImage>
          <ArtistName>{artist?.name}</ArtistName>
          <ArtistInfoContainer>
            <Genres>
              <h3>Genres</h3>
              {artist.genres.map((genre, i) => (
                <span key={i}>{genre}</span>
              ))}
            </Genres>
            <Popularity>
              <h3>Popularity</h3>
              <span>{artist.popularity}%</span>
            </Popularity>
            <Followers>
              <h3>Followers</h3>
              <span>{artist.followers.total}</span>
            </Followers>
          </ArtistInfoContainer>
        </Container>
      ) : (
        <Layout>Loading...</Layout>
      )}
    </Layout>
  );
};
