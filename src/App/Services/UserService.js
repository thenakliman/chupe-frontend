const axios = require('axios');

const CHUPE_USER_URL='/api/v1'

export const UserService  = {
  getUsers() {
      return axios({
        method: 'get',
        url: `${CHUPE_USER_URL}`,
        headers: {'Content-Type': 'application/json'}
      })
      .then(response=>response)
      .catch((error) => {
          console.log(error.message);
      })
  }
}
