const axios = require('axios');

const CHUPE_USER_URL='http://localhost:8080/api/v1';

export const UserService = {
  getUsers() {
      return axios({
        method: 'get',
        url: `${CHUPE_USER_URL}/users`,
        headers: {'Content-Type': 'application/json'},
      })
      .then((response)=>response.data)
      .catch((error) => {
          console.log(error.message);
      });
  },
};
