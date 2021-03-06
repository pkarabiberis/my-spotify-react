import axios from 'axios';
import { Item } from '../types/Tracks';
import { getHashParams } from '../utils';

const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq?._retry) {
      originalReq._retry = true;
      await refreshAccessToken();
      originalReq.headers['Authorization'] = `Bearer ${getLocalAccessToken()}`;
      return axios(originalReq);
    }

    return Promise.reject(err);
  }
);

const setTokenTimestamp = () =>
  window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());
const setLocalAccessToken = (token: string) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const getTokenTimestamp = () =>
  window.localStorage.getItem('spotify_token_timestamp') || 0;
const getLocalAccessToken = () =>
  window.localStorage.getItem('spotify_access_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `${
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:8888/refresh_token'
          : 'https://my-spotify.karabiberisapps.com/refresh_token'
      }`,
      {
        withCredentials: true,
      }
    );
    const { access_token } = data;
    if (access_token) {
      setLocalAccessToken(access_token);
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

// Get access token off of query params
export const getAccessToken = () => {
  const { access_token } = getHashParams();

  // If token has expired
  if (Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = async () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  await axios.get(
    `${
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/logout'
        : 'https://my-spotify.karabiberisapps.com/logout'
    }`,
    {
      withCredentials: true,
    }
  );
  window.location.reload();
};

axios.interceptors.request.use(async (conf) => {
  conf.headers.Authorization = getLocalAccessToken()
    ? `Bearer ${getLocalAccessToken()}`
    : '';
  return conf;
});

//Api calls

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => axios.get('https://api.spotify.com/v1/me');

/**
 * Get User's Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist');

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played');

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () =>
  axios.get('https://api.spotify.com/v1/me/playlists');

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsShort = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term'
  );
export const getTopArtistsMedium = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term'
  );
export const getTopArtistsLong = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term'
  );

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term'
  );
export const getTopTracksMedium = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term'
  );
export const getTopTracksLong = () =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term'
  );

/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
 */
export const getArtist = (artistId: string) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`);

/**
 * Follow an Artist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const followArtist = (artistId: string) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: 'put', url });
};

/**
 * Check if Current User Follows Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const doesUserFollowArtist = (artistId: string) =>
  axios.get(
    `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`
  );

/**
 * Check if Users Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const doesUserFollowPlaylist = (playlistId: string, userId: string) =>
  axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`
  );

/**
 * Create a Playlist (The playlist will be empty until you add tracks)
 * https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
 */
export const createPlaylist = (userId: string, name: string) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({ name });
  return axios({ method: 'post', url, data });
};

/**
 * Add Tracks to a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */
export const addTracksToPlaylist = (playlistId: string, uris: string) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: 'post', url });
};

/**
 * Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/
 */
export const followPlaylist = (playlistId: string) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  return axios({ method: 'put', url });
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getPlaylist = (playlistId: string) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`);

/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
 */
export const getPlaylistTracks = (playlistId: string) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`);

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = (tracks: Item[]) => tracks.map(({ id }) => id).join(',');

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */
export const getAudioFeaturesForTracks = (tracks: Item[]) => {
  const ids = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`);
};

/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
export const getRecommendationsForTracks = (tracks: Item[]) => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
  const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
  const seed_artists = '';
  const seed_genres = '';

  return axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`
  );
};

/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
export const getTrack = (trackId: string) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`);

/**
 * Get Audio Analysis for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
export const getTrackAudioAnalysis = (trackId: string) =>
  axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`);

/**
 * Get Audio Features for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 */
export const getTrackAudioFeatures = (trackId: string) =>
  axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`);

export const getUserInfo = () =>
  axios
    .all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getTopArtistsLong(),
      getTopTracksLong(),
    ])
    .then(
      axios.spread(
        (user, followedArtists, playlists, topArtists, topTracks) => ({
          user: user.data,
          followedArtists: followedArtists.data,
          playlists: playlists.data,
          topArtists: topArtists.data,
          topTracks: topTracks.data,
        })
      )
    );

export const getTrackInfo = (trackId: string) =>
  axios
    .all([
      getTrack(trackId),
      getTrackAudioAnalysis(trackId),
      getTrackAudioFeatures(trackId),
    ])
    .then(
      axios.spread((track, audioAnalysis, audioFeatures) => ({
        track: track.data,
        audioAnalysis: audioAnalysis.data,
        audioFeatures: audioFeatures.data,
      }))
    );
