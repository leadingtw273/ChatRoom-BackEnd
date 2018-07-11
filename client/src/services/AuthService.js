import api from '@/services/api';

export default {
  register(msg) {
    return api.base().post('/register', msg);
  }
};
