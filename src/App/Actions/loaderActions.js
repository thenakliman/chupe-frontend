import {ActionTypes} from './ActionTypes';

export const showLoader = (loaderId) => ({
  type: ActionTypes.SHOW_LOADER,
  payload: loaderId,
});


export const hideLoader = (loaderId) => ({
  type: ActionTypes.HIDE_LOADER,
  payload: loaderId,
});