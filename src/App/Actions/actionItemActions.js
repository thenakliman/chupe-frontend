import {ActionItemService} from '../Services/ActionItemService';
import {ActionTypes} from './ActionTypes';
import {showLoader, hideLoader} from './loaderActions';
import {showNotificationFromObject} from './notificationActions';

import {
  GET_ACTION_ITEMS_LOADER_ID,
  GET_ACTION_ITEMS_NOTIFICATION
  } from '../Components/Result/Common/constants';


const addActionItems = (actionItems) => ({
  type: ActionTypes.ADD_ACTION_ITEMS,
  payload: actionItems,
});

export const getActionItems = () => async (dispatch) => {
  dispatch(showLoader(GET_ACTION_ITEMS_LOADER_ID));
  try {
    const actionItems = await ActionItemService.getActionItems();
    dispatch(addActionItems(actionItems));
  } catch (error) {
    dispatch(showNotificationFromObject(GET_ACTION_ITEMS_NOTIFICATION));
  }
  dispatch(hideLoader(GET_ACTION_ITEMS_LOADER_ID));
};