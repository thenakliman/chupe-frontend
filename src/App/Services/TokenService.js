import * as CookiesUtility from '../utils/cookies';
import axios from 'axios';

const tokenURL = '/token';

export function get(url) {
    return axios.get(url)
    .then((response)=>response.headers.authorization)
    .catch((error) => {
        console.log(error.message);
    });
}

/** Returns token
 * @param {string} username of the logged in user
 * @return {string} token of the logged in user
 */
export async function getToken(username) {
  let token = CookiesUtility.getToken();

  if (token) {
    return token;
  }

  token = await get(tokenURL + '?username=' + username);
  CookiesUtility.setCookies(token);
  return token;
}
