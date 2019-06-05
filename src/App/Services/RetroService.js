import {get, post, put} from './client';

const CHUPE_RETRO_URL='/api/v1';

export const RetroService = {
  async getRetros() {
      return await get(`${CHUPE_RETRO_URL}/retros`);
  },

  async getRetroPoints(retroId) {
      return await get(`${CHUPE_RETRO_URL}/retro-points?retroId=${retroId}`);
  },

  async getActionItems(retroId) {
      return await get(`${CHUPE_RETRO_URL}/retro-action-items?retro=${retroId}`);
  },

  async createRetro(retro) {
      return await post(`${CHUPE_RETRO_URL}/retros`, retro);
  },

  async createRetroPoint(retroPoint) {
      return await post(`${CHUPE_RETRO_URL}/retro-points`, retroPoint);
  },

  async createActionItem(actionItem) {
      return await post(`${CHUPE_RETRO_URL}/retro-action-items`, actionItem);
  },

  async changeStatus(retroId, status) {
      return await put(`${CHUPE_RETRO_URL}/retro-status/${retroId}`, {status: status});
  },

  async castVote(retroPointId) {
      return await post(`${CHUPE_RETRO_URL}/retro-point-votes/${retroPointId}`);
  },
};
