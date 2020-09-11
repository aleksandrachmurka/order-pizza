import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://order-pizza-44676.firebaseio.com/'
});

export default instance;