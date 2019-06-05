import {ActionTypes} from './ActionTypes';
import {RetroService} from '../Services/RetroService';
import {showLoader, hideLoader} from './loaderActions';
import {showNotification} from './notificationActions';

import {
  CREATE_RETRO_LOADER_ID,
  CREATE_RETRO_POINT_LOADER_ID,
  CREATE_RETRO_ACTION_ITEM_LOADER_ID,
  CAST_VOTE_LOADER_ID,
  GET_RETROS_LOADER_ID,
  GET_RETRO_ACTION_ITEMS_LOADER_ID,
  GET_RETRO_POINT_LOADER_ID,
  CREATE_RETRO_NOTIFICATION,
  CREATE_RETRO_ACTION_ITEM_NOTIFICATION,
  GET_RETRO_ACTION_ITEMS_NOTIFICATION,
  CREATE_RETRO_POINT_NOTIFICATION,
  GET_RETROS_NOTIFICATION,
  GET_RETRO_POINT_NOTIFICATION,
  CAST_VOTE_NOTIFICATION,
  CHANGE_RETRO_STATUS_ID,
  CHANGE_RETRO_STATUS_NOTIFICATION,
  } from '../Components/Result/Common/constants';


const addRetros = (retros) => ({
  type: ActionTypes.ADD_RETROS,
  payload: retros,
});

const addRetroActionItems = (actionItems) => ({
  type: ActionTypes.ADD_RETRO_ACTION_ITEMS,
  payload: actionItems,
});

export const getAllRetros = () => async (dispatch) => {
  dispatch(showLoader(GET_RETROS_LOADER_ID));
  try {
    const retros = await RetroService.getRetros();
    dispatch(addRetros(retros));
  } catch (error) {
    dispatch(showNotification(
      GET_RETROS_NOTIFICATION.id,
      GET_RETROS_NOTIFICATION.type,
      GET_RETROS_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_RETROS_LOADER_ID));
};

export const changeStatus = (retroId, status) => async (dispatch) => {
  dispatch(showLoader(CHANGE_RETRO_STATUS_ID));
  try {
    await RetroService.changeStatus(retroId, status);
    dispatch(getAllRetros());
  } catch (error) {
    dispatch(showNotification(
      CHANGE_RETRO_STATUS_NOTIFICATION.id,
      CHANGE_RETRO_STATUS_NOTIFICATION.type,
      CHANGE_RETRO_STATUS_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CHANGE_RETRO_STATUS_ID));
};

export const getActionItems = (retro) => async (dispatch) => {
  dispatch(showLoader(GET_RETRO_ACTION_ITEMS_LOADER_ID));
  try {
    const actionItems = await RetroService.getActionItems(retro);
    dispatch(addRetroActionItems(actionItems));
  } catch (error) {
    dispatch(showNotification(
      GET_RETRO_ACTION_ITEMS_NOTIFICATION.id,
      GET_RETRO_ACTION_ITEMS_NOTIFICATION.type,
      GET_RETRO_ACTION_ITEMS_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_RETRO_ACTION_ITEMS_LOADER_ID));
};

const addRetroPoints = (retroPoints) => ({
  type: ActionTypes.ADD_RETRO_POINTS,
  payload: retroPoints,
});


export const getRetroPoints = (retroId) => async (dispatch) => {
  dispatch(showLoader(GET_RETRO_POINT_LOADER_ID));
  try {
    const retroPoints = await RetroService.getRetroPoints(retroId);
    dispatch(addRetroPoints(retroPoints));
  } catch (error) {
    dispatch(showNotification(
      GET_RETRO_POINT_NOTIFICATION.id,
      GET_RETRO_POINT_NOTIFICATION.type,
      GET_RETRO_POINT_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_RETRO_POINT_LOADER_ID));
};

export const castVote = (retroId, retroPointId) => async (dispatch) => {
  dispatch(showLoader(CAST_VOTE_LOADER_ID));
  try {
    await RetroService.castVote(retroPointId);
    dispatch(getRetroPoints(retroId));
  } catch (error) {
    dispatch(showNotification(
      CAST_VOTE_NOTIFICATION.id,
      CAST_VOTE_NOTIFICATION.type,
      CAST_VOTE_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CAST_VOTE_LOADER_ID));
};

export const createRetro = (retro) => async (dispatch) => {
  dispatch(showLoader(CREATE_RETRO_LOADER_ID));
  try {
    await RetroService.createRetro(retro);
    dispatch(getAllRetros());
  } catch (error) {
    dispatch(showNotification(
      CREATE_RETRO_NOTIFICATION.id,
      CREATE_RETRO_NOTIFICATION.type,
      CREATE_RETRO_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CREATE_RETRO_LOADER_ID));
};

export const createActionItem = (actionItem) => async (dispatch) => {
  dispatch(showLoader(CREATE_RETRO_ACTION_ITEM_LOADER_ID));
  try {
    await RetroService.createActionItem(actionItem);
    dispatch(getActionItems(actionItem.retroId));
  } catch (error) {
    dispatch(showNotification(
      CREATE_RETRO_ACTION_ITEM_NOTIFICATION.id,
      CREATE_RETRO_ACTION_ITEM_NOTIFICATION.type,
      CREATE_RETRO_ACTION_ITEM_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CREATE_RETRO_ACTION_ITEM_LOADER_ID));
};

export const createRetroPoint = (retroPoint) => async (dispatch) => {
  dispatch(showLoader(CREATE_RETRO_POINT_LOADER_ID));
  try {
    await RetroService.createRetroPoint(retroPoint);
    dispatch(getRetroPoints(retroPoint.retroId));
  } catch (error) {
    dispatch(showNotification(
      CREATE_RETRO_POINT_NOTIFICATION.id,
      CREATE_RETRO_POINT_NOTIFICATION.type,
      CREATE_RETRO_POINT_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CREATE_RETRO_POINT_LOADER_ID));
};
