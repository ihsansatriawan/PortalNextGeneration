import axios from 'axios';

const fetch = axios.create({
  baseURL: 'https://fim-server.herokuapp.com',
  timeout: 10000,
});

export { fetch };
