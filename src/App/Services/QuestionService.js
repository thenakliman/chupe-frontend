const axios = require('axios');

const CHUPE_QUESTION_URL='/api/v1';

export const QuestionService = {
  getQuestions() {
      return axios({
        method: 'get',
        url: `${CHUPE_QUESTION_URL}/questions`,
        headers: {'Content-Type': 'application/json'},
      })
      .then((response)=>response.data)
      .catch((error) => {
          console.log(error.message);
      });
  },
  askQuestion() {
  },
};
