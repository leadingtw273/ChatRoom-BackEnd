import api from '@/services/api';

export default {
  register(msg) {
    return api().post('register', msg, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
