import axios from 'axios';

const stagingUri = 'https://staging-fim.herokuapp.com';
const prodUri = 'https://fim-server.herokuapp.com';

const fetch = axios.create({
  baseURL: prodUri,
  timeout: 10000,
});

export { fetch };
