const axios = require("axios");

require("dotenv").config();

let token = null;

const sendAPIRequest = (query, variables = null) => {
  const headers = token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    : { headers: { "Content-Type": "application/json" } };

  return axios.post(
    process.env.API_ENDPOINT,
    {
      query,
      variables
    },
    headers
  );
};

const loginWorker = async () => {
  const mutation = `
    mutation Authenticate($input: AuthenticateInput!) {
      authenticate(input: $input) {
        jwtToken
      }
    }
  `;

  const variables = {
    input: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    }
  };

  try {
    const response = await sendAPIRequest(mutation, variables);
    token = response.data.data.authenticate.jwtToken;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  loginWorker,
  sendAPIRequest,
};
