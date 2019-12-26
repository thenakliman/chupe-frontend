import {get} from './client';

const CHUPE_USER_URL = '/api/v1';

export const UserService = {
  async getUsers() {
    return await get(`${CHUPE_USER_URL}/users`);
  },
};
