import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../spotify';
import { Item } from '../types/Playlists';
import { Layout } from './Layout';

interface PlaylistProps {}

export const Playlist: React.FC<PlaylistProps> = ({}) => {
  const [playlist, setPlaylist] = useState<Item | null>(null);
  const params: { playlistId: string } = useParams();
  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data } = await getPlaylist(params.playlistId);
      setPlaylist(data);
    };

    fetchPlaylist();
  }, [params.playlistId]);

  console.log('playlist: ', playlist);

  return (
    <>
      {playlist ? (
        <Layout>{playlist.name}</Layout>
      ) : (
        <Layout>Loading...</Layout>
      )}
    </>
  );
};
