import {get} from './client';

const CHUPE_RETRO_URL='/api/v1';

export const RetroService = {
  async getRetros() {
      return await get(`${CHUPE_RETRO_URL}/retros`);
  },

  async getRetroPoints(retroId) {
      return await get(`${CHUPE_RETRO_URL}/retro-points?retroId=${retroId}`);
  },
};
