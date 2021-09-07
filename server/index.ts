require('dotenv-safe').config();
import express from 'express';
import request from 'request';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import historyapifallback from 'connect-history-api-fallback';
import { URLSearchParams } from 'url';
import { COOKIE_NAME, __prod__ } from './constants';

const REDIRECT_URI = __prod__
  ? process.env.REDIRECT_URI
  : 'http://localhost:8888/callback';
const FRONTEND_URI = __prod__
  ? process.env.FRONTEND_URI
  : 'http://localhost:3000';
const PORT = __prod__ ? process.env.PORT : 8888;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const generateRandomString = (length: number): string => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

// Priority serve any static files.

app.use(express.static(path.resolve(__dirname, '../client/build')));

app
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(
    cors({
      origin: FRONTEND_URI,
      credentials: true,
    })
  )
  .use(cookieParser())
  .use(
    historyapifallback({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: '/login' },
        { from: /\/callback/, to: '/callback' },
        { from: /\/refresh_token/, to: '/refresh_token' },
      ],
    })
  )
  .use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (_, res) => {
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

app.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope =
    'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
      state,
      show_dialog: 'true',
    })}`
  );
});

app.get('/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  //ok
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`${FRONTEND_URI}/login`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        res.cookie(COOKIE_NAME, refresh_token, {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          domain: __prod__ ? 'my-spotify.herokuapp.com' : undefined,
          secure: __prod__,
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${FRONTEND_URI}/#${new URLSearchParams({
            access_token,
            refresh_token,
          })}`
        );
      } else {
        res.redirect(`${FRONTEND_URI}/login`);
      }
    });
  }
});

app.get('/refresh_token', (req, res) => {
  // requesting access token from refresh token
  const refresh_token = req.cookies ? req.cookies[COOKIE_NAME] : null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

app.get('/logout', (_, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).send('ok');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
