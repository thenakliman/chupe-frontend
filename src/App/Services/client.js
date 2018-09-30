import axios from 'axios';
import {getToken} from '../utils/cookies';

/** Get headers
 * @param {object} headers
 * @return {object}
 */
const getHeaders = (headers) => {
  const token = getToken();
  return {headers: {...headers, Authorization: token}};
};
/** REST Get call
 * @param {string} url for the request
 * @param {object} headers
 * @return {object} response of the call
 */
export function get(url, headers) {
    console.log(getHeaders(headers));
    return axios.get(url, getHeaders(headers))
    .then((response)=>response.data)
    .catch((error) => {
        console.log(error.message);
    });
}

/** REST Post call
 * @param {string} url for the request
 * @param {object} body for the request
 * @param {object} headers
 * @return {object} response of the call
 */
export function post(url, body, headers) {
    return axios.post(url, body, getHeaders(headers))
    .then((response)=>response.data)
    .catch((error) => {
        console.log(error.message);
    });
}

/** REST Put call
 * @param {string} url for the request
 * @param {object} body for the request
 * @param {object} headers
 * @return {object} response of the call
 */
export function put(url, body, headers) {
    return axios.put(url, body, getHeaders(headers))
    .then((response)=>response.data)
    .catch((error) => {
        console.log(error.message);
    });
}
