import {get, put, post} from './client';

const CHUPE_QUESTION_URL='/api/v1/question';

export const QuestionService = {
  getQuestions() {
      return get(CHUPE_QUESTION_URL);
  },

  askQuestion(question) {
      return post(CHUPE_QUESTION_URL, question);
  },

  updateQuestion(question) {
      return put(`${CHUPE_QUESTION_URL}/${question.id}`, question);
  },
};
