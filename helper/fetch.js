import axios from 'axios';

const fetch = axios.create({
  baseURL: 'https://staging-fim.herokuapp.com',
  timeout: 10000,
});

export { fetch };
