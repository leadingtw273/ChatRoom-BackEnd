import axios from 'axios';

export default () => {
  const ax = axios.create({
    baseURL: 'http://loclhost:3000/'
  });
  ax.defaults.headers.post['Content-Type'] = 'application/json';
  return ax;
};
