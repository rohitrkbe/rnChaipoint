import axios from "axios";
import * as actionDispatch from '../action';
import * as API from '../api/apiConstant';
import idx from 'idx';
import { AsyncStorage, NetInfo } from 'react-native'
import Toast from 'react-native-simple-toast';
import { Messages } from '../constant/message';

const SERVER_IP = API.baseUrl;  // used for baseUrl declaration
// const authToken = null;   // used in case of token
var api = axios.create({
  baseURL: SERVER_IP,
  timeout: 10000,
  headers: {
    'content-type': 'Application/json'
  },
});

// AsyncStorage.getItem(asyncStorageConst.accessToken, (error, token) => {
//   authToken = token;
//   if (authToken != null) {
//     api.defaults.headers.common['Authorization'] = authToken;
//   }
// });

const showTimeout = (props) => {
  if (props) {
    Toast.show(Messages.Request_Timeout, Toast.LONG);
  }
}

const No_Internet_Message = () => {
  Toast.show(Messages.No_Internet, Toast.LONG);
}

isValidJSON = (str) => {
  if (typeof str == 'object') {
    return true;
  }
  else {
    Toast.show(Messages.Invalid_Response_Object, Toast.LONG);
    return false;
  }
};

// updateHeader = (accessToken) => {
//   api.defaults.headers.common['Authorization'] = accessToken;
//   authToken = accessToken;
// };

// use if NetInfo.isConnected.fetch doesn't work on ios
isInternetConnected = () => {
  NetInfo.getConnectionInfo().then((connectionInfo) => {
    return connectionInfo.type != 'none' || connectionInfo.type != 'unknown' ? true : false;
  });
}

export const getApiResponse = () => {
  return dispatch => {
    NetInfo.isConnected.fetch()
    .then(isConnected => {
      if (isConnected) {
        api.get(API.sampleUrl)  // define your request type here get/post/put/update
        .then(response => {
          if (isValidJSON(response)) {
            dispatch(actionDispatch.apiResponseData(response.data));  // particular set of data required to dispatch to action
            // dispatch(actionDispatch.apiResponseData(response.status)) // to be used for post/put/update api response validation
          } else {
          //Sentry log here for invalid reponse of this particilar api
          }
        })
        .catch(error => {
          // dispatch(actionDispatch.apiResponseData(error.response.status)) // post/put/update api request error response handling
          dispatch(actionDispatch.apiResponseData('error'));  // pass error for error handling on the screen
          if (error.request._response == 'timeout') {
            showTimeout(true);
          }
        })
      } else {
          No_Internet_Message();
      }
    });
  }
};
