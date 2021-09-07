"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv-safe').config();
var express_1 = __importDefault(require("express"));
var request_1 = __importDefault(require("request"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
var url_1 = require("url");
var constants_1 = require("./constants");
var REDIRECT_URI = constants_1.__prod__
    ? process.env.REDIRECT_URI
    : 'http://localhost:8888/callback';
var FRONTEND_URI = constants_1.__prod__
    ? process.env.FRONTEND_URI
    : 'http://localhost:3000';
var PORT = constants_1.__prod__ ? process.env.PORT : 8888;
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
var stateKey = 'spotify_auth_state';
var app = (0, express_1.default)();
// Priority serve any static files.
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client/build')));
app
    .use(express_1.default.static(path_1.default.resolve(__dirname, '../client/build')))
    .use((0, cors_1.default)({
    origin: FRONTEND_URI,
    credentials: true,
}))
    .use((0, cookie_parser_1.default)())
    .use((0, connect_history_api_fallback_1.default)({
    verbose: true,
    rewrites: [
        { from: /\/login/, to: '/login' },
        { from: /\/callback/, to: '/callback' },
        { from: /\/refresh_token/, to: '/refresh_token' },
    ],
}))
    .use(express_1.default.static(path_1.default.resolve(__dirname, '../client/build')));
app.get('/', function (_, res) {
    res.render(path_1.default.resolve(__dirname, '../client/build/index.html'));
});
app.get('/login', function (_, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
    res.redirect("https://accounts.spotify.com/authorize?" + new url_1.URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
        show_dialog: 'true',
    }));
});
app.get('/callback', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect(FRONTEND_URI + "/login");
    }
    else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            },
            headers: {
                Authorization: "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString('base64'),
            },
            json: true,
        };
        request_1.default.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                var refresh_token = body.refresh_token;
                res.cookie(constants_1.COOKIE_NAME, refresh_token, {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                    httpOnly: true,
                    domain: constants_1.__prod__ ? '.karabiberisapps.com' : undefined,
                    secure: constants_1.__prod__,
                });
                // we can also pass the token to the browser to make requests from there
                res.redirect(FRONTEND_URI + "/#" + new url_1.URLSearchParams({
                    access_token: access_token,
                    refresh_token: refresh_token,
                }));
            }
            else {
                res.redirect(FRONTEND_URI + "/login");
            }
        });
    }
});
app.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    var refresh_token = req.cookies ? req.cookies[constants_1.COOKIE_NAME] : null;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString('base64'),
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        },
        json: true,
    };
    request_1.default.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({ access_token: access_token });
        }
    });
});
app.get('/logout', function (_, res) {
    res.clearCookie(constants_1.COOKIE_NAME);
    res.status(200).send('ok');
});
// All remaining requests return the React app, so it can handle routing.
app.get('*', function (_, res) {
    res.sendFile(path_1.default.resolve(__dirname, '../client/public', 'index.html'));
});
app.listen(PORT, function () { return console.log("listening on " + PORT); });
