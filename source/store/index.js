import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { persistStore, persistReducer } from 'redux-persist';
import reducer from '../reducer';

// Logs all actions and states after they are dispatched.
const logger = store => next => action => {
  console.group(action.type)  // comment this console in build
  if(__DEV__) 
  console.info('dispatching', action)
  let result = next(action)
  if(__DEV__) 
  console.log('next state', store.getState())
  console.groupEnd()  // comment this console in build
  return result;
}

// Sends crash reports as state is updated and listeners are notified.
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (error) {
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw error
  }
}

const config = {
  key: 'root', // key is required
  storage, // storage is now required
  blacklist: [],
};

const reducers = persistReducer(config, reducer);

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(reducers, composeEnhancers(
    applyMiddleware(
        thunk,
        logger,
        crashReporter
      )
    )
  );
  let persistor = persistStore(store);
  persistor.purge();
  return { store, persistor };
}