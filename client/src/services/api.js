import axios from 'axios';

export default {
  base() {
    return axios.create({
      baseURL: 'http://localhost:3000/'
    });
  },
  tpeoc() {
    return axios.create({
      baseURL: 'https://tpeoc.blob.core.windows.net/blobfs/'
    });
  }
};
