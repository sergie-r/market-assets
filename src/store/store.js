import { createStore, applyMiddleware } from 'redux';
import assetsReducer from '../reducers/assetsReducer';
import normilizeMiddleware from '../middleware/normilize';

export default function configureStore (initial) {
  return createStore(assetsReducer, initial, applyMiddleware(normilizeMiddleware));
};