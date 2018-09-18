import {get} from './client';

const CHUPE_TASK_URL='/api/v1/tasks';

export const TaskService = {
  getTasks() {
      return get(CHUPE_TASK_URL);
  },
}