import {get, post} from './client';

const CHUPE_BASE_URL = '/api/v1';

export const PracticesService = {
  async getPractices() {
    return await get(`${CHUPE_BASE_URL}/best-practices`);
  },

  async getBestPracticesAssessment(retroId) {
    return await get(`${CHUPE_BASE_URL}/retros/${retroId}/practices-assessment`);
  },

  async saveBestPracticesAssessments(retroId, assessments) {
    return await post(`${CHUPE_BASE_URL}/retros/${retroId}/practices-assessment`, assessments);
  },
};
