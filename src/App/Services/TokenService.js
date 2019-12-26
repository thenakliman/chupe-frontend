import * as CookiesUtility from '../utils/cookies';
import axios from 'axios';
import encode from 'base-64';

const tokenURL = '/token';

/** Return token from the header.
 * @param {string} url for the token
 * @param {object} headers for the authorization
 * @return {string} token received
 */
export async function get(url, headers) {
  return await axios.get(url, {headers: headers})
      .then((response) => response.headers.authorization)
      .catch((error) => {
        // todo(thenakliman): Add test for this branch
        console.log(error.message);
      });
}

/** Returns token
 * @param {string} username of the logged in user
 * @param {password} password for the user
 * @return {string} token of the logged in user
 */
export async function getToken(username, password) {
  let token = CookiesUtility.getToken();

  if (token) {
    return token;
  }

  const base64Credentials = 'Basic ' + encode.encode(username + ':' + password);
  const headers = {Authorization: base64Credentials};
  token = await get(tokenURL + '?username=' + username, headers);

  CookiesUtility.setCookies(token);
  return token;
}
