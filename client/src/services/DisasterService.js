import api from '@/services/api';

export default {
  GetFTDDamData() {
    return api.tpeoc().get('/GetFTDDamData.json');
  },
  GetLeaveHouseData() {
    return api.tpeoc().get('/GetLeaveHouseData.json');
  },
  GetAccommodatePlaceData() {
    return api.tpeoc().get('/GetAccommodatePlaceData.json');
  },
  GetDisasterSummary() {
    return api.tpeoc().get('/GetDisasterSummary.json');
  },
  GetDisasterDecisionSummary() {
    return api.tpeoc().get('/GetDisasterDecisionSummary.json');
  },
  GetDamageCaseData() {
    return api.tpeoc().get('/GetDamageCaseData.json');
  }
};
