import {get, post} from './client';

const CHUPE_RETRO_URL='/api/v1';

export const RetroService = {
  async getRetros() {
      return await get(`${CHUPE_RETRO_URL}/retros`);
  },

  async getRetroPoints(retroId) {
      return await get(`${CHUPE_RETRO_URL}/retro-points?retroId=${retroId}`);
  },

  async castVote(retroPointId) {
      return await post(`${CHUPE_RETRO_URL}/retro-point-votes/${retroPointId}`);
  },
};
