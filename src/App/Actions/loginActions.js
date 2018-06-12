import * as ActionTypes from './ActionTypes';

export const setUsername = (username) => ({
    type: ActionTypes.SET_USERNAME,
    payload: username,
});
