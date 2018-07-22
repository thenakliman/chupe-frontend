import {get, post} from './client';

const CHUPE_ANSWER_URL='/api/v1/answers';

export const AnswerService = {
  async getAnswers(questionId) {
      return await get(`${CHUPE_ANSWER_URL}?questionId=${questionId}`);
  },

  async addAnswer(answer) {
      return await post(`${CHUPE_ANSWER_URL}`, answer);
  },
};
