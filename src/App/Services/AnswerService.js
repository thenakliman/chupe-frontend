const axios = require('axios');

const CHUPE_ANSWER_URL='/api/v1/answers';

export const AnswerService = {
  getAnswers(questionId) {
      return axios({
        method: 'get',
        url: `${CHUPE_ANSWER_URL}/${questionId}`,
        headers: {'Content-Type': 'application/json'},
      })
      .then((response)=>response.data)
      .catch((error) => {
          console.log(error.message);
      });
  },
};
