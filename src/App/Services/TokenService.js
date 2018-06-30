import * as CookiesUtility from '../utils/cookies';
import {get} from './client';

const tokenURL = '/token';

/** Returns token
 * @param {string} username of the logged in user
 * @return {string} token of the logged in user
 */
export function getToken(username) {
  let token = CookiesUtility.getToken();

  if (token) {
    return token;
  }

  token = get(tokenURL + '?username=' + username);
  CookiesUtility.setCookies(token);
  return token;
}
