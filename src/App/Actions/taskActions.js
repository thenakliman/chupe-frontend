import {ActionTypes} from './ActionTypes';
import {TaskService} from '../Services/TaskService';

export const addTasks = (tasks) => ({
  type: ActionTypes.ADD_TASKS,
  payload: tasks,
});


export const getAllTasks = () => async (dispatch) => {
  try {
    const tasks = await TaskService.getTasks();
    dispatch(addTasks(tasks));
  } catch (error) {
    console.log('Error on fetching tasks');
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    await TaskService.createTask(task);
    dispatch(getAllTasks());
  } catch (error) {
    console.log('Error on creating tasks');
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    await TaskService.updateTask(task);
    dispatch(getAllTasks());
  } catch (error) {
    console.log('Error on update tasks');
  }
};
