import {get, post} from './client';

const CHUPE_TASK_URL='/api/v1/tasks';

export const TaskService = {
  getTasks() {
      return get(CHUPE_TASK_URL);
  },

  createTask(task) {
      return post(CHUPE_TASK_URL, task);
  },
};
