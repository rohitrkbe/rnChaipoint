import * as AC from '../actionConstant';

export const apiResponseData = payload => ({
  type: AC.API_CALL_RESPONSE,
  data: payload
});