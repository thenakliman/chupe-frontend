import axios from 'axios';
import {getToken} from '../utils/cookies';

const getHeaders = (headers) => {
  const token = getToken();
  return {headers: {...headers, Authorization: token}};
};

export function get(url, headers) {
    return axios.get(url, getHeaders(headers))
    .then((response)=>response.data);
}

export function post(url, body, headers) {
    return axios.post(url, body, getHeaders(headers))
    .then((response)=>response.data);
}

export function put(url, body, headers) {
    return axios.put(url, body, getHeaders(headers))
    .then((response)=>response.data);
}
