import {get} from './client';

const CHUPE_ACTION_ITEMS_URL='/api/v1/action-items';

export const ActionItemService = {
  async getActionItems() {
      return await get(`${CHUPE_ACTION_ITEMS_URL}`);
  },
};
