import axios from 'axios';

/** REST Get call
 * @param {string} url for the request
 * @return {object} response of the call
 */
export function get(url) {
    return axios.get(url)
    .then((response)=>response.data)
    .catch((error) => {
        console.log(error.message);
    });
}

/** REST Post call
 * @param {string} url for the request
 * @param {object} body for the request
 * @return {object} response of the call
 */
export function post(url, body) {
    return axios.post(url, body)
    .then((response)=>response.data)
    .catch((error) => {
        console.log(error.message);
    });
}

/** REST Put call
 * @param {string} url for the request
 * @param {object} body for the request
 * @return {object} response of the call
 */
export function put(url, body) {
    return axios.put(url, body)
    .then((response)=>response.data)
    .catch((error) => {
        console.log(error.message);
    });
}
