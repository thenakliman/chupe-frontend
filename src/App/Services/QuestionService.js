const axios = require('axios');

const CHUPE_QUESTION_URL='/api/v1';

export const QuestionService = {
  getQuestions() {
      return axios({
        method: 'get',
        url: `${CHUPE_QUESTION_URL}/question`,
        headers: {'Content-Type': 'application/json'},
      })
      .then((response)=>response.data)
      .catch((error) => {
          console.log(error.message);
      });
  },
  askQuestion(question) {
      return axios({
        method: 'post',
        url: `${CHUPE_QUESTION_URL}/question`,
        headers: {'Content-Type': 'application/json'},
        data: question,
      })
      .then((response)=>response)
      .catch((error) => {
          console.log(error.message);
      });
  },
  updateQuestion(question) {
      return axios({
        method: 'put',
        url: `${CHUPE_QUESTION_URL}/question/${question.id}`,
        headers: {'Content-Type': 'application/json'},
        data: question,
      })
      .then((response)=>response)
      .catch((error) => {
          console.log(error.message);
      });
  },
};
