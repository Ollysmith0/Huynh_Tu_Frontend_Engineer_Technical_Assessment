import axios from 'axios';

const ins = axios.create({
  baseURL: 'https://fe-assignment-api.herokuapp.com',
  timeout: 10000,
  headers: {
    'x-api-key': `${process.env.REACT_APP_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export default ins;
