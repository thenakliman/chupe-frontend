import {ActionTypes} from './ActionTypes';
import {TaskService} from '../Services/TaskService';
import {hideLoader, showLoader} from './loaderActions';
import {showNotification} from './notificationActions';

import {
  CREATE_TASK_LOADER_ID,
  CREATE_TASK_NOTIFICATION,
  GET_TASKS_LOADER_ID,
  GET_TASKS_NOTIFICATION,
  UPDATE_TASK_LOADER_ID,
  UPDATE_TASK_NOTIFICATION,
} from '../Components/Result/Common/constants';

export const addTasks = (tasks) => ({
  type: ActionTypes.ADD_TASKS,
  payload: tasks,
});


export const getAllTasks = () => async (dispatch) => {
  dispatch(showLoader(GET_TASKS_LOADER_ID));
  try {
    const tasks = await TaskService.getTasks();
    dispatch(addTasks(tasks));
  } catch (error) {
    dispatch(showNotification(
        GET_TASKS_NOTIFICATION.id,
        GET_TASKS_NOTIFICATION.type,
        GET_TASKS_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_TASKS_LOADER_ID));
};

export const createTask = (task) => async (dispatch) => {
  dispatch(showLoader(CREATE_TASK_LOADER_ID));
  try {
    await TaskService.createTask(task);
    dispatch(getAllTasks());
  } catch (error) {
    dispatch(showNotification(
        CREATE_TASK_NOTIFICATION.id,
        CREATE_TASK_NOTIFICATION.type,
        CREATE_TASK_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CREATE_TASK_LOADER_ID));
};

export const updateTask = (task) => async (dispatch) => {
  dispatch(showLoader(UPDATE_TASK_LOADER_ID));
  try {
    await TaskService.updateTask(task);
    dispatch(getAllTasks());
  } catch (error) {
    dispatch(showNotification(
        UPDATE_TASK_NOTIFICATION.id,
        UPDATE_TASK_NOTIFICATION.type,
        UPDATE_TASK_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(UPDATE_TASK_LOADER_ID));
};
