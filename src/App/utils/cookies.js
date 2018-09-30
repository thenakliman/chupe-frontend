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

const removeCookie = (key, value) => {
  cookies.remove(key);
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

export const removeCookies = (token) => {
  removeCookie(TOKEN_COOKIE_KEY);
  removeCookie(TOKEN_EXPIRY_COOKIE_KEY);
  removeCookie(TOKEN_USERNAME_KEY);
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
  /* Date has been divided by 1000 because accuracy of expiry date is less */
  if (!cookies.get(TOKEN_COOKIE_KEY) ||
      !cookies.get(TOKEN_EXPIRY_COOKIE_KEY) ||
      parseInt(cookies.get(TOKEN_EXPIRY_COOKIE_KEY)) < (Date.now()/1000)) {
    return null;
  }

  return cookies.get(TOKEN_COOKIE_KEY);
};
