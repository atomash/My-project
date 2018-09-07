import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import rootReducer from './rootReducer';

axios.defaults.baseURL = 'http://localhost:4000';

const configureStore = (initialState, options = { logger: true }) => {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production' && options.logger) {
    const logger = createLogger({ collapsed: true });
    middleware.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};

export default configureStore;