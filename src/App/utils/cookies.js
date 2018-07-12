import Cookies from 'universal-cookie';
import {verify, decode} from 'jsonwebtoken';

const TOKEN_COOKIE_KEY = 'token';
const TOKEN_EXPIRY_COOKIE_KEY = 'expiryTime';
const TOKEN_USERNAME_KEY = 'username';
const audience = 'chupe-frontend';
const issuer = 'chupe';
export let cookies = new Cookies();
const Config = require('Config');

const setCookie = (key, value) => {
  cookies.set(key, value);
};

export const setCookies = (token) => {
  verify(token,
         Config.signingKey,
         {
            algorithms: ['HS512'],
            audience: audience,
            issuer: issuer,
            ignoreExpiration: false,
         },
         (e) => console.log(e)
  );

  const decodedToken = decode(token);
  setToken(token);
  setTokenExpiryTime(decodedToken.exp);
  setUsername(decodedToken.username);
};

const setToken = (token) => {
  setCookie(TOKEN_COOKIE_KEY, token);
};

const setTokenExpiryTime = (expiryTime) => {
  setCookie(TOKEN_EXPIRY_COOKIE_KEY, expiryTime);
};

const setUsername = (userName) => {
  setCookie(TOKEN_USERNAME_KEY, userName);
};

export const getUsername = () => {
  return cookies.get(TOKEN_USERNAME_KEY);
};

export const getToken = () => {
  if (!cookies.get(TOKEN_COOKIE_KEY) ||
      !cookies.get(TOKEN_EXPIRY_COOKIE_KEY) ||
      cookies.get(TOKEN_EXPIRY_COOKIE_KEY) < Date.now()) {
    return null;
  }

  return cookies.get(TOKEN_COOKIE_KEY);
};
