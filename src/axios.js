import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pizza-c75f6.firebaseio.com/'
});

export default instance;