import * as CookiesUtility from '../utils/cookies';
import axios from 'axios';

const tokenURL = '/token';

/** Return token from the header.
 * @param {string} url for the token
 * @return {string} token received
 */
export async function get(url) {
    return await axios.get(url)
    .then((response)=>response.headers.authorization)
    .catch((error) => {
        // todo(thenakliman): Add test for this branch
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
