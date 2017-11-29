import assetsActions from '../actions/assetsActions';
import { normalizeAssets } from './normalizeAssets';

const normilizeMiddleware = ({ dispatch, getState }) => next => (action) => {
  console.log(action)
  if (action.type === assetsActions.GET_ASSETS) {
    const actionCopy = Object.assign({}, action, {
      assets: normalizeAssets([action.assets]),
    });
    return next(actionCopy);
  }

  if (action.type === assetsActions.ADD_TO_FAVORITES) {
    const actionCopy = Object.assign({}, action, {
      favorites: normalizeAssets([action.favorites]),
    });
    return next(actionCopy);
  }
  return next(action);
};

export default normilizeMiddleware;